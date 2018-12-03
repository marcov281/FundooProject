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
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { NoteServiceService } from  '../../core/service/noteService/note-service.service';
import {MatSnackBar} from '@angular/material';
import {SearchService} from '../../core/service/dataService/search.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
//taking response from another component
@Input()
note:any
//creating new event emmitter object
@Output()
showNote=new EventEmitter();
//creating instance
constructor(private service:NoteServiceService,
            private snackbar:MatSnackBar,
            private dataservice:SearchService
){ }

ngOnInit() {

  }
//--------------------------------------------------------------------------------------------
/**
 * @description:this function will make a perticular card to archive list 
 */
//---------------------------------------------------------------------------------------------
 
 archive()
{
  var pin=this.note.isPined
  this.showNote.emit("2");
//defining blank array  
    var idlist=[];
    idlist.push(this.note.id);
    //pushing id to an array

    var body={
      "isArchived":true,
      "noteIdList":idlist,
    }
//calling add archive object
    this.service.addArchive(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        if(pin==true){
          this.snackbar.open('Notes unPined and Archived ', 'close', {
            duration: 1500,
          });
        }
        
        else
        this.snackbar.open('Notes Archived ', 'close', {
          duration: 1000,
        });
        this.showNote.emit(true);
        this.dataservice.updateReminder("true");
      },
      error=>{
        this.snackbar.open('Notes archive failed!!!please try again ', 'close', {
          duration: 1500,
        });
        throw error;
      }
    )}
    ngOnDestroy() {
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
  
}
