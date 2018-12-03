/******************************************************************************
 *  Execution       :   1. default node         cmd> add-notes.component.ts 
 *
 *  Purpose         : this pogram is to redirect the valid admin to the dashboard 
 *  @description    
 * 
 *  @file           : add-notes.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : add-notes.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Output, EventEmitter,Input} from '@angular/core';
import {ElementRef, ViewChild } from '@angular/core';
import { NoteServiceService } from '../../core/service/noteService/note-service.service';
import { Router } from '@angular/router'
import {SearchService} from  '../../core/service/dataService/search.service'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from '../../core/service/userService/client.service';
import {userList} from '../../core/Model/note'
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public listval;
  public check: boolean = false;
  public label = [];
  public ispined = false;
  public color: string;
  public temp = [];
  public list = [];
  listarray = [];
  public checkText;
  public body;
  public isChecked: boolean = false;
  public dateTime;
  private collaboratorList=[];
  private col:boolean=false;
  private imagePath:string;
  private name:string;
  private nameInput:string;
  private mail:string;
  private nameList=[];
  private listCollaborator=[];
  private colList=[];
  private tempList=[];
  private tempTitle:string;
  private tempDescription:string;
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;

  //creating instance of event emiitter
  @Output() onAdding = new EventEmitter()
  constructor(
    public service: NoteServiceService,
    private router: Router,
    private dataService:SearchService,
    private userservice:ClientService
  ) { }

  //defining variable note1 for perpose
  public note1: boolean = true;
  ngOnInit() {
    localStorage.getItem('userid');
    this.imagePath= 'http://34.213.106.173/'+localStorage.getItem('imageUrl');
    this.name=localStorage.getItem('firstName')+' '+ localStorage.getItem('lastName')+'(Owner)';
    this.mail=localStorage.getItem('email')
    this.dataService.onReminder.subscribe(data=>{
      if(data=="true"){
        var date=new Date();
        var hour=date.getHours();
        var min=date.getMinutes();
        var newTimeStamp=new Date(date.getFullYear(),date.getMonth(),date.getDate()+0,hour,min,0)
        this.dateTime=newTimeStamp
      }
    })
  }
  /**
   * @description:this function will add note to the list array and send to database
   */
  postValue() {
    
    if (this.listarray.length != 0 || this.listval) {
      var listvalue = {
        "value": this.listval,
        "status":"open"
      }
      this.listarray.push(listvalue)

      var checklist = [];
      for (var i = 0; i < this.listarray.length; i++) {
        checklist.push({
          "itemName": this.listarray[i].value,
          "status": this.listarray[i].status,
        })
      }
      var title = this.title.nativeElement.innerHTML;

      if (title.length == 0) {

        this.color = "#FAFAFA";
        this.ispined = false;
        return false;
      }

      if (this.color == undefined) {
        this.color = '#FAFAFA'
      }

      for (var i = 0; i < this.temp.length; i++) {
        this.list.push(this.temp[i].id)
      }
      console.log(this.dateTime);
      
      this.body = {
        'title': title,
        'isPined': this.ispined,
        'isArchived': false,
        'color': this.color,
        'checklist': JSON.stringify(checklist),
        'labelIdList': JSON.stringify(this.list),
        'reminder':this.dateTime,
        'collaberators':JSON.stringify(this.collaboratorList)
      }
    }

    else if (this.title && this.description) {
      var title = this.title.nativeElement.innerHTML;
      var description = this.description.nativeElement.innerHTML;

      if (title.length == 0 || description.length == 0) {
        this.color = "#FAFAFA";
        this.ispined = false;
        return false;
      }

      if (this.color == undefined) {
        this.color = '#FAFAFA'
      }

      for (var i = 0; i < this.temp.length; i++) {
        this.list.push(this.temp[i].id)
      }

      this.body = {
        'title': title,
        'description': description,
        'isPined': this.ispined,
        'isArchived': false,
        'color': this.color,
        'labelIdList': JSON.stringify(this.list),
        'reminder':this.dateTime,
        'collaberators':JSON.stringify(this.collaboratorList)
      }
    }
    if (this.body != undefined || this.body != null) {
      this.service.addnote(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.tempTitle=null;
          this.tempDescription=null;
          this.collaboratorList=[];
          this.dateTime=null;
          this.ispined = false;
          this.color = "#FAFAFA";
          this.temp = [];
          this.listarray = [];
          this.listval = null;   
          this.onAdding.emit(data["status"].details);//emmiting to parent
          this.dataService.addSucess('true');
          LoggerService.log('post sucessfull')

        },
        error => {
          this.dateTime=null;
         LoggerService.log('post failed')
          throw error;
        });
    }
  }

  chamgeColor(event) {

    this.color = event;
  }

  pincolor() {
    this.ispined = !this.ispined
  }

  updatelabel(event) {
    if (this.temp.indexOf(event) >= 0) {
      this.temp.splice(this.temp.indexOf(event), 1)
    }
    else if (this.temp.indexOf(event) < 0) {
      this.temp.push(event)
    }
  }

  removeChip(label) {
    this.temp.splice(this.temp.indexOf(label), 1)
  }

  changetolist() {
    this.check = true;
  }

  onKeydown(event) {
    if (event.key === "Enter" && event.target.value.length != 0 && event.target.value.trim().length != 0) {
      this.listarray.push({ "value": this.listval, "status": "open" });
      this.listval=null;
    }
    
  }

  clearAdded(data) {
    if (data.length != 0) {
      this.listarray.splice(this.listarray.indexOf(data), 1);
    }
  }

  checkbox(myval) { 
  if(myval.status="close"){
    this.listarray[this.listarray.indexOf(myval)].status="open"
  }
  if(myval.status="open"){
    this.listarray[this.listarray.indexOf(myval)].status="close"
  }
  }

  getDate(event){
  this.dateTime=event;
  }

  removeReminder(){
  this.dateTime=null;
  }

  goToDes(){
    this.check=false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

//======================================================================================
//======================================================================================
getName(event){
  if(this.nameInput!=null && this.nameInput!=undefined && this.nameInput.length!=0){
    var reqBody={
      "searchWord":this.nameInput
    }
    this.userservice.searchUserList(reqBody).subscribe(
      data=>{
        let arr:userList[]=data["data"].details
       this.nameList=arr;
      },
      error=>{
        console.log('error');  
        throw error;
      })
    }
}

addToColaborator(user){
  var name=user.email.split('')
    let letter=name[0].toUpperCase();
    let body={
      "letter":letter,
      "userobj":user
    }
  this.colList.push(body);
  this.nameInput=null;
}

removeCollaborator(data){ 
  this.colList.splice(this.colList.indexOf(data),1);
  this.collaboratorList.splice(this.collaboratorList.indexOf(data.userobj),1)
}

saveToList(){
this.collaboratorList=[];
for(var i=0;i<this.colList.length;i++){
  this.collaboratorList.push(this.colList[i].userobj)
}
  this.col=false;
}

cancel(){
  this.col=false;
  this.colList=[];
}

addTitle(){
  this.tempTitle = this.title.nativeElement.innerHTML;
  if(this.check==false){
    this.tempDescription = this.description.nativeElement.innerHTML;
  }
}


}
