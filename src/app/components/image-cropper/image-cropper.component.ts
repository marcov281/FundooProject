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
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {NoteServiceService} from '../../core/service/noteService/note-service.service'
import {NavbarComponent} from '../navbar/navbar.component'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
public updatedImage:File;
  constructor(public dialogRef: MatDialogRef<NavbarComponent>,
  @Inject(MAT_DIALOG_DATA) public file: any,private service:NoteServiceService) { }

  ngOnInit() {
  }

  imageCropped(event){
  this.updatedImage=event.file;
  
  }

  updatePic(){
    
    var data=new FormData();
    data.append("file",this.updatedImage,this.updatedImage.name)
    this.service.updateProfile(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        LoggerService.log('image updated sucessfully')
      this.dialogRef.close();
      localStorage.setItem('imageUrl',data["status"].imageUrl)
      },
      error=>{
        LoggerService.log('update failed');
        throw error;
      })
  }

  ngOnDestroy() {
    console.log('hii destroyed');
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
