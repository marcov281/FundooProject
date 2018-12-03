/******************************************************************************
 *  Execution       :   1. default node         cmd> list-archive.component.ts 
 *
 *  Purpose         : to  print the archive list that has been already archived 
 *  @description    
 * 
 *  @file           : list-archive.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : list-archive.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from '../../core/service/noteService/note-service.service';
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Note} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//importing the required module
@Component({
  selector: 'app-list-archive',
  templateUrl: './list-archive.component.html',
  styleUrls: ['./list-archive.component.scss']
})
export class ListArchiveComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //creating a blank array
  public notes = [];
  public list = [];
  constructor(private service: NoteServiceService,
              private snackbar:MatSnackBar
  ) { }
  //on init of the compontnt the method will be called
  ngOnInit() {
    this.getArchiveNotes();
  }
  //this method will get the array of all archived notes
  getArchiveNotes() {
    this.service.getarchive()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.notes = [];
        var archiveNotes:Note[]=data["data"].data
        for (var i = archiveNotes.length - 1; i >= 0; i--) {
          if (archiveNotes[i].isDeleted == false) {
            this.notes.push(archiveNotes[i])
          }
        }
      },
      error => {
        LoggerService.log('get archive failed')
        throw error;
      })
  }
  refresh(event) {
    this.getArchiveNotes();
  }
  themeChange(event) {
    this.getArchiveNotes();
  }

  updateLabel(event) { 
    this.getArchiveNotes();
  }

  unarchive(note)
  {
  //defining blank array  
      var idlist=[];
      idlist.push(note.id);
      //pushing id to an array

      var body={
        "isArchived":false,
        "noteIdList":idlist
      }
  //calling add archive object
      this.service.addArchive(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data=>{
  //popping up message
          this.snackbar.open('Notes Unarchived ', 'close', {
            duration: 1000,
          });
        this.getArchiveNotes();
        },
        error=>{
          LoggerService.log('unarchive failed')
          throw error;
        }
      )}

  pinArchive(note){
    LoggerService.logdata('pin is',note.isPined)
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
    this.service.updateCheckBox(checkitem.id,note.id, object)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        LoggerService.log('update check sucess')
        this.getArchiveNotes();
      },
      error => {
        LoggerService.log('update check failed')
        throw error;
      }
    )
  }

  ngOnDestroy() {
    
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
