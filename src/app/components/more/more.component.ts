/******************************************************************************
 *  Execution       :   1. default node         cmd> more.component.ts 
 *
 *  Purpose         : this component will delete the all note that has been called to delete
 *  @description    
 * 
 *  @file           : more.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : more.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../core/service/httpService/user.service';
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Label} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router'
import { SearchService } from '../../core/service/dataService/search.service';
//importing all the required module
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
//exportingthe class
export class MoreComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  name = 'Angular';
  public labellist = [];
  public temp=[];
  public temp1;
  public change:boolean=true;
  //getting shraed file from the parent component 
  @Input()
  note: any;
  //emmiting file to the parent component and also creating event emmitter object 
  @Output() ondelete = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() updateLabel = new EventEmitter();
  @Output() changeBox=new EventEmitter();
  constructor(private service: UserService, 
    private noteservice: NoteServiceService,
    private router:Router,
  private dataService:SearchService) {
    this.getlabel();
  }

  ngOnInit() {

    
  }
  //-----------------------------------------------------------------------------------
  /**
   * @description:this method will call the service and in service it wil call the dlete api 
   */
  //-----------------------------------------------------------------------------------
  delete() {

    var idList = [];
    idList.push(this.note.id)
    //insrting the id of the card to the blank array
    var body = {
      "isDeleted": true,
      "noteIdList": idList
    }
    this.noteservice.deleteNote(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        LoggerService.log('delete sucessfull')
        this.ondelete.emit(true);
      },
      error => {
        LoggerService.log('delete failed')
        throw error;
      }
    )
  }


  getlabel() {

    this.service.httpGetData('/noteLabels/getNoteLabelList')
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.labellist = [];
        var labelList:Label[]=data["data"].details
        for (var i = labelList.length - 1; i >= 0; i--) {
          if (labelList[i].isDeleted == false) {
            this.labellist.push(labelList[i]);
          }
        }
        if(this.note!=undefined){
        for (var i = 0; i < this.labellist.length; i++) {
          this.labellist[i]['isChecked'] = false;
          for (var j = 0; j < this.note.noteLabels.length; j++) {
            if (this.note.noteLabels[j].id == this.labellist[i].id) {
              this.labellist[i]['isChecked'] = true;
            }
          }
         
        }}
      
      },
      error => {
       LoggerService.log('error')
       throw error;
      }
    )
  }


  check(label) {

    if(this.note==undefined){  
      this.updateLabel.emit(label)
    }
    
    if (label.isChecked == false && this.note!=undefined) {
      this.noteservice.addLabelToNote(this.note.id, label.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
         LoggerService.log('label add sucessfull')
          this.update.emit(label);
          this.update.emit(true);
        }, error => {
         LoggerService.log('label add failed')
         throw error;
        })
    }
    else if (label.isChecked == true && this.note!=undefined) {
      this.noteservice.removeLabelToNote(this.note.id, label.id)
      
      .subscribe(
        data => {
          this.update.emit(true);
          this.update.emit(label);
          LoggerService.log('remove add sucess')
        }, error => {
         LoggerService.log('remove add failed')
         throw error;
        })
    }
  }

optionChange(note){
  if(this.change==true){
    var obj={
      "status":"hide",
      "value":note
    }
  this.changeBox.emit(obj)
  }
  if(this.change==false){
    var obj={
      "status":"show",
      "value":note
    }
    this.changeBox.emit(obj)
    }
  this.change=!this.change
  }
  changeToDescription(){
    this.changeBox.emit("true");
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  goToQa(){
    this.dataService.changeToQa('true')
    var urlString='/questionAnswer/'+this.note.id;
    this.router.navigate(['/questionAnswer/'+this.note.id]);
  }
}
