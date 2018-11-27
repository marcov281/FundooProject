/******************************************************************************
 *  Execution       :   1. default node         cmd> notes.component.ts 
 *
 *  Purpose         : this is the base 
 *  @description    
 * 
 *  @file           : notes.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : notes.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input } from '@angular/core';
import { NoteServiceService } from  '../../core/service/noteService/note-service.service';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Note} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//this will import all the required module
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
//exporting all the classes
export class NotesComponent implements OnInit {
destroy$: Subject<boolean> = new Subject<boolean>();
  public notes=[];
 public pinNotes=[];
 public unPinNotes=[];
  @Input() ArchiveNotes:any;
  constructor(
    public service:NoteServiceService,
   
  ) { }
//on init it will call getnotes
  ngOnInit() {
    this.getNotes();
  }
//on refresh it will again load the page
  refresh(event){
    this.notes.unshift(event)
    this.filterPin(this.notes);
  }
//----------------------------------------------------------------------------------
/**
 * @description:this is the method to call all the note card from the api,whwnever some changes 
 * happend it will refresh the whole page and load the updated cards
 */
  getNotes()
  {
    this.service.getnotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{          
        this.notes=[];  
       
       var notesData: Note[]= data["data"].data
       for(var i=notesData.length-1;i>=0;i--)
       { 
         if(notesData[i].isDeleted==false && notesData[i].isArchived==false)
         {
          this.notes.push(notesData[i])
         }     
       }
       LoggerService.data(this.notes)
            this.filterPin(this.notes);                
      },
      error=>{
        LoggerService.log('getting notes failed') 
        throw error;   
      }
    )
  }
  updateCard(event){
    this.notes=[];
    this.getNotes();
  }
  archivenote(event){
    this.getNotes();
  }
  chipUpdate(event){
    this.getNotes();
  }
  updatepin(){
    this.getNotes();
  }

  filterPin(notes){
    this.pinNotes=[];
    this.unPinNotes=[];
    for(var i=0;i<notes.length;i++){
      if(notes[i].isPined==true){
        this.pinNotes.push(notes[i])
      }
      else if(notes[i].isPined==false){
        this.unPinNotes.push(notes[i])
      }
    } 
  }

  ngOnDestroy() {
    console.log('hii destroyed');
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
