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
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public notes = [];
  constructor(public noteService: NoteServiceService,
  private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.getTrashList()
  }

  getTrashList() {

    this.noteService.getTrash()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.notes=[];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (data["data"].data[i].isDeleted == true) {
            this.notes.push(data["data"].data[i])
          }
        }
      },
      error => {
        LoggerService.log('failed')
        throw error;
      })
  }

  restore(note){
    var idList = [];
    idList.push(note.id);
    var body = {
      "isDeleted": false,
      "noteIdList": idList
    }
    this.noteService.restoreNotes(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {

        //this.getTrashList();
        this.snackbar.open('sucessfull restored', 'close', {
          duration: 1000,
        });
        this.getTrashList();
        
      },
      error => {
        LoggerService.log('failed')
        throw error;
      }
    )
  }

  deeteForever(note){
    var idList = [];
    idList.push(note.id);
    var body = {
      "noteIdList": idList
    }
    this.noteService.deleteForever(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        LoggerService.log('Sucess')
        this.getTrashList();
      },
      error=>{
        LoggerService.log('failed')
        throw error;
      }
    )
  }
 
  updateCheckbox(){
    window.alert("Cant edit")
  }

  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
