/******************************************************************************
 *  Execution       :   1. default node         cmd> add-archive.component.ts 
 *
 *  Purpose         : this pogram is to redirect the valid admin to the dashboard 
 *  @description    
 * 
 *  @file           : add-archive.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : add-archive.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import {NoteServiceService} from '../../core/service/noteService/note-service.service'
import {SearchService} from  '../../core/service/dataService/search.service'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Note} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public notes;
  constructor(private service:NoteServiceService,
              private dataService:SearchService
  ) { }

  ngOnInit() {
    this.getReminderNotes();
    this.dataService.add.subscribe(data=>{
      if(data=='true'){
        this. getReminderNotes();
      }
    })

  this.dataService.reminderToAdd("true")

  this.dataService.onReminder.subscribe(data=>{  
  if(data=="true"){
      this.getReminderNotes();
    }
  })
  }

  getReminderNotes(){
    var notes=[];
    this.service.getRemindersList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
       var arr:Note[]=data["data"].data
       for(var i=0;i<arr.length;i++){
         if(arr[i].reminder[0]!="Invalid Date"){
            notes.push(arr[i]);
         }
       }
        notes.sort(function(a,b){
          a=new Date(a.reminder[0]);
          b=new Date(b.reminder[0]);
          return a-b;
        })
        this.notes=notes;
        LoggerService.data(notes)
      },
      error=>{
        LoggerService.log('getting reminder notes failed')
        throw error; 
      })
  }

  updateCard(event){
    this.getReminderNotes();
  }
  chipUpdate(event){
    this.getReminderNotes();
  }
  ngOnDestroy() {
  
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
