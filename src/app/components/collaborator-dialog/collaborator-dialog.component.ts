import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ClientService } from '../../core/service/userService/client.service';
import {userList} from '../../core/Model/note'
import { SearchService } from '../../core/service/dataService/search.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})

export class CollaboratorDialogComponent implements OnInit {
  private imagePath:string;
  private name:string;
  private mail:string;
  private nameInput:string;
  private nameList=[];
  private input:boolean=true;
  private listCollaborator=[];
  private colList=[];
  private partner:boolean=false;
  private owner:boolean=true;
  private partnerData;
  constructor(public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private service:ClientService
    ,private dataService :SearchService,
    private snackbar:MatSnackBar) {
    console.log(data);
     }

  ngOnInit() {
    let myid=localStorage.getItem('userid');
    this.imagePath= 'http://34.213.106.173/'+localStorage.getItem('imageUrl');
    this.name=localStorage.getItem('firstName')+' '+ localStorage.getItem('lastName');
    this.mail=localStorage.getItem('email')

    for(var i=0;i<this.data.collaborators.length;i++){
        console.log(this.data.collaborators[i]);
        var name=this.data.collaborators[i].email.split('')
        let letter=name[0].toUpperCase();
        let body={
          "letter":letter,
          "userobj":this.data.collaborators[i]
        }
          this.colList.push(body);
      }
      if(this.data.userId!=myid){
        this.partner=true;
        this.owner=false;
        this.partnerData=this.data.user;
      }
   
  }

  getName(event){
    try{
    if(this.nameInput!=null && this.nameInput!=undefined && this.nameInput.length!=0){
      var reqBody={
        "searchWord":this.nameInput
      }
      this.service.searchUserList(reqBody).subscribe(
        data=>{
          let arr:userList[]=data["data"].details
         this.nameList=arr;
        },
        error=>{
          throw new error("something bad happened searching name");
          throw error;
        })
    }
  }
  catch(e){
    console.log(e);
        if (e instanceof ReferenceError || e instanceof SyntaxError || e instanceof TypeError) {
           
          console.log('please visit the administrator',e);
          

        } else {
            console.log(e);
            
        }
  }
  }

 close(){
   this.dialogRef.close();
 }

 addToColaborator(data){
    this.nameInput=null;
    var name=data.email.split('')
    let letter=name[0].toUpperCase();
    let body={
      "letter":letter,
      "userobj":data
    }
    for(var i=0;i<this.listCollaborator.length;i++){
      if(this.listCollaborator[i].userobj==data){
        this.snackbar.open('email already exixt', 'close', {
          duration: 1000,
        })
      }
    }
    this.listCollaborator.push(body);
 }

 addCollaboratorList(user){
  this.data.collaborators.push(user.userobj);
  this.listCollaborator.splice(this.listCollaborator.indexOf(user.userobj),1)
  this.colList.push(user);
  this.service.addCollaborator(this.data.id,user.userobj).subscribe(
    data=>{
      console.log('add sucessfull');
    },
    error=>{
      console.log('add failed');  
      throw error;
    })
 }

 removeCollaborator(user){
  this.data.collaborators.splice(this.data.collaborators.indexOf(user),1);
  this.colList.splice(this.colList.indexOf(user),1);
  this.service.deleteCollaborator(this.data,user).subscribe(
    data=>{
      console.log('sucess in delete');
    },
    error=>{
      console.log('failed to delete');
      throw error;
    })
 }

}
