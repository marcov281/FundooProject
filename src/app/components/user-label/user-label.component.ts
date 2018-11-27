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
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserlabeldialogComponent } from '../userlabeldialog/userlabeldialog.component'
import { UserService } from '../../core/service/httpService/user.service';
import { SearchService } from '../../core/service/dataService/search.service'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Label} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.scss']
})
export class UserLabelComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private isSelected:boolean=false
  public labellist = [];
  private routeName:string;
  @Output()
  labelupadate = new EventEmitter();
  @Input() opendialog: any;
  @Output() sendName=new EventEmitter();
  constructor(public dialog: MatDialog,
    private service: UserService,
    private dataservice: SearchService,
    private route:ActivatedRoute,) {
    this.getlabel();

  }

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {
       this.routeName=params['params'].label;
      })
    if (this.opendialog == "true") {
      this.opendialog();
    }
    this.dataservice.currchange.subscribe(data=>{
      if(data=="true"){
        this.opendialog()
      }
    })
    this.dataservice.onSelect.subscribe(
      data=>{
        if(data=="null"){
          console.log(data);   
          this.routeName=null
        }
      }
    )
  }

  openDialog(): void {
    this.labelupadate.emit(true)
    const dialogRef = this.dialog.open(UserlabeldialogComponent, {
      width: '350px',//
      data: null
    }
    );
    //------------------------------------------------------------------------------------------
    dialogRef.afterClosed().subscribe(result => {
      this.getlabel();
    });
  }

  getlabel() {
    this.service.httpGetData('/noteLabels/getNoteLabelList')
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.labellist = [];
        var labellistArray:Label[]=data["data"].details
        for (var i = labellistArray.length - 1; i >= 0; i--) {
          if (labellistArray[i].isDeleted == false) {
            this.labellist.push(labellistArray[i])
          }
        }},
      error => {
        LoggerService.log('failed')
        throw error;
      }
    )}

    emitlabelname(name){
      this.routeName=name;
      this.sendName.emit(name)
    }

    ngOnDestroy() {
      console.log('hii');
      this.destroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.destroy$.unsubscribe();
    }
}
