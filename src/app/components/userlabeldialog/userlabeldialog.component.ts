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
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import { MatSnackBar } from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-userlabeldialog',
  templateUrl: './userlabeldialog.component.html',
  styleUrls: ['./userlabeldialog.component.scss']
})
export class UserlabeldialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  model: any = {};
  public labellist = [];
  public edit:Boolean = false;
  public editlabelid:String;
  public newlabel:String;

  constructor(public dialogRef: MatDialogRef<UserlabeldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: NoteServiceService,
    public snackbar: MatSnackBar,
  ) {
    // this.getlabel();
  }

  ngOnInit() {
    this.getlabel();
  }


  createlabel() {
    
    if (this.model.labelName == undefined ||
      this.model.labelName == null ||
      this.model.labelName == '' ) {
      this.snackbar.open('please enter proper value', 'close', {
        duration: 2000,
      });
      return false;
    }
    this.model.labelName = this.model.labelName.trim();
    var labelName = this.model.labelName;
    var userId = localStorage.getItem('userid');
   
    for(var i=0;i<this.labellist.length;i++){   
      if(labelName == this.labellist[i].label){
        this.snackbar.open('Label name already exists', 'close', {
          duration: 2500,
        });
        return -1;
      }  
    }
    var requestBody = {
      "label": labelName,
      "isDeleted": false,
      "userId": userId
    }
    this.service.createLabel(requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
       LoggerService.log('sucess')
        this.model.labelName = null;
        this.getlabel();
      },
      error => {
        LoggerService.log('failed')
        throw error;
      })
      this.dialogRef.close(); 
  }

  onNoClick() {
    console.log('hii');
    this.dialogRef.close();
  }

  clear() {
    this.model.labelName = null;
  }

  getlabel() {
    this.service.getLabel()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.labellist = [];
        for (var i = data["data"].details.length - 1; i >= 0; i--) {
          if (data["data"].details[i].isDeleted == false) {
            this.labellist.push(data["data"].details[i])
          }
        }
      },
      error => {
        LoggerService.log('error')
        throw error;
      }
    )
  }

  deleteLabel(id) {
    this.service.deleteLabel(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.snackbar.open('delete sucessfull', 'close', {
          duration: 500,
        });
        this.getlabel();
      },
      error => {
        this.snackbar.open('something error happened', 'close', {
          duration: 500,
        });
        throw error;
        LoggerService.log('errror')
      }
    )
  }

  editlabel(id) {
    this.editlabelid=null;
    this.editlabelid = id
  }


  updateLabel(id) {
    var newlabel=document.getElementById("newlabel").innerHTML;
    if (newlabel == undefined || newlabel == null || newlabel == ' ') {
      return false;
    }
    var body = {
      "label": newlabel
    }


    this.service.updateLabel(id,body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.snackbar.open('label upadatad sucessfully', 'close', {
          duration: 2000,
        });
        this.getlabel();
        this.newlabel=null;
      },
      error => {
        this.snackbar.open('some error happened', 'close', {
          duration: 500,
        });
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
