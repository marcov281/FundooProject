/******************************************************************************
 *  Execution       :   1. default node         cmd> note-card.component.ts 
 *
 *  Purpose         : this is to get the array of updated card and to print in a looop
 *  @description    
 * 
 *  @file           : note-card.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : note-card.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import { EditNotesComponent } from '../edit-notes/edit-notes.component'
import {NoteServiceService} from '../../core/service/noteService/note-service.service'
import {SearchService} from '../../core/service/dataService/search.service'
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//importing all the required module
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})

export class NoteCardComponent implements OnInit {
destroy$: Subject<boolean> = new Subject<boolean>();
public pinColor=false
//definging the variables
public more=false;
public color:string;
public change:boolean;
public noteChangeId:string;
public time;
public id;
//getting some response from the chile componenet
@Input()notes:any;
public pinNotes=[];
public unPinNotes=[];
public colList=[];
@Input() message:string;


//giving response to te parent componenet
@Output() archivenote=new EventEmitter();
@Output() updateChipInCard=new EventEmitter();
@Output() themeCol=new EventEmitter();
@Output() updateCard=new EventEmitter();
@Output() updatepin=new EventEmitter();

public data:any
  constructor(
    public dialog: MatDialog,
    public noteservice:NoteServiceService,
    private someserv:SearchService,
    public snackbar:MatSnackBar,
  ) { 
  }


  ngOnInit() {
   this.someserv.currentdata.subscribe(data=>{
     this.data=data;    
  }) 


}


//this function will open the dialog screen and pass the value to the edit notes componenet
openDialog(note): void {
  const dialogRef = this.dialog.open(EditNotesComponent, {
    width: '790px',//
    maxWidth: 'auto',
    data: note
  } 
  
);
this.themeCol.emit(note)
//------------------------------------------------------------------------------------------
  dialogRef.afterClosed().subscribe(result => {
   this.updateCard.emit(true);
  });
  
}
//this will refresh the all note cards
refresh(event){
this.updateCard.emit(true);
}
//this will referesh the cards after hitting the change color button
themeChange(event){
 
this.themeCol.emit(true)
}
//thiis will refesh all the note in the archive notes section
shownote(event){
  this.archivenote.emit(true)
}

updateCHIP(event){
  
  this.updateChipInCard.emit(true);
}

removeChip(noteid,labelid){
  this.noteservice.removeLabelToNote(noteid, labelid)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    data => {
      this.updateChipInCard.emit(true);
      LoggerService.log('remove and sucess')
    }, error => {
      LoggerService.log('remove and failed')
      throw error;
    })
}
changePin(note){
  
  var idList = [];
  idList.push(note.id);
  var body={
    "isPined": note.isPined,
    "noteIdList": idList
  }
this.noteservice.pinUnpin(body)
.pipe(takeUntil(this.destroy$))
.subscribe(
  data=>{
  this.updatepin.emit()
LoggerService.log('sucess')
  },
  error=>{
LoggerService.log('failed')
throw error;
  })
}
updateCheckbox(checkitem,note){
 var status;
    if (checkitem.status == "close") {
      status = "open";
    }
    else if (checkitem.status == "open") {
      status = "close"
    }
    var object = {
      "itemName": checkitem.itemName,
      "status": status
    }
    this.noteservice.updateCheckBox(checkitem.id,note.id, object)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        LoggerService.log('checkstatus updated')
        this.updateCard.emit(true);
      },
      error => {
       LoggerService.log('update check failed')
       throw error;
      })
}

hideBox(event){
  if(event.status=="hide"){
    this.change=false;
    this.noteChangeId=event.value.id
  }
  if(event.status=="show"){
    this.change=true;
    this.noteChangeId=event.value.id;
  }
}

getDate(event){
  if(event){
    this.snackbar.open('Adding keep reminder? You must allow Browser push notification', 'close', {
      duration: 1000,
    });
  }
  this.updateCard.emit(true);
}

removeReminder(note,reminder){
  var idList=[];
  idList.push(note.id);
  var dateBody = {
    "reminder": reminder,
    "noteIdList": idList
  }
  this.noteservice.deleteReminder(dateBody)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    data=>{
      LoggerService.log('sucess')
      note.reminder.pop();
      this.updateCard.emit(true);
    },
    error=>{
      LoggerService.log('failed')
      throw error;
    }
  )
}
getChnageMenu(){ 
this.someserv.getMenu("true");
}

checkTime(note){
  var abc=new Date();
var newTime=new Date(note.reminder[0]).getTime()

  
if(note.reminder[0]!="Invalid Data" && (newTime<abc.getTime())){
  return false;
}
else if(note.reminder[0]!="Invalid Data" && (newTime>abc.getTime()))
{
  return true;
}
}

ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}


}
