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
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {SearchService} from '../../core/service/dataService/search.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-remindme',
  templateUrl: './remindme.component.html',
  styleUrls: ['./remindme.component.scss']
})

export class RemindmeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public menuTo: boolean = true;
  constructor(private service: NoteServiceService,
  private snackbar:MatSnackBar,
  private dataService:SearchService) { }
  @Input() note: any;
  public date = new Date();
  public newDate;
  public valueInput:boolean=true;
  public customDate;
  public customTime;
  public hours;
  public minutes;
  public newCustomDate;
  public time1:boolean=false;
  public time2:boolean=false;
  public time3:boolean=false;
  public time4:boolean=false;
  public todayDate:Date=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate());
  @Output() sendDate = new EventEmitter();
  @Output() sendToAdd = new EventEmitter();
  @Output() toEdit=new EventEmitter();
  
date2=new Date()
  ngOnInit() {
    this.customDate=new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate())
    var hours=this.date.getHours()+3;
    if(hours>12){
      this.customTime=(hours-12)+':'+this.date.getMinutes()+' PM'
    }
    else if(hours<=12){
      this.customTime=hours+':'+this.date.getMinutes()+' AM'
    }
  this.blockDate();
    
  this.dataService.onClickChip.subscribe(data=>{  
    if(data=="true"){
     this.menuTo=false;
    }
  })
  }
/**
 * @description:this function will block the time that is already past,it will disable 
 * the button 
 */
  blockDate(){
    if((this.date.getDate()==this.customDate.getDate()) && 
    (this.date.getMonth()==this.customDate.getMonth()) && 
    (this.date.getFullYear()==this.customDate.getFullYear()))
  {    
    var year=this.date.getFullYear();
    var mon=this.date.getMonth();
    var date=this.date.getDate();

    if(this.date.getTime()>new Date(year,mon,date,8).getTime())
    {
      this.time1=true;
    }
    if(this.date.getTime()>new Date(year,mon,date,13).getTime())
    {
      this.time2=true;
    }
    if(this.date.getTime()>new Date(year,mon,date,18).getTime())
    {
      this.time3=true;
    }
    if(this.date.getTime()>new Date(year,mon,date,20).getTime())
    {
      this.time4=true;
    }
  }
  }
  
/**
 * @description:this function is used to call the api with the hard coded button,user dont need 
 * to choose custom
 */

  chooseTime(data) {
    if (data == '8pm') {
      this.newDate = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate() + 0, 20, 0, 0)
    }
    else if (data == '8am') {
      this.newDate = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate() + 1, 8, 0, 0)
    }
    else if (data == 'nextweek') {
      this.newDate = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate() + 7, 8, 0, 0)
    }
    if (this.note == undefined) {
      this.sendToAdd.emit(this.newDate);
    }
    if (this.note != null && this.note != undefined) {
      var idlist = [];
      idlist.push(this.note.id)
      var dateBody = {
        "reminder": this.newDate,
        "noteIdList": idlist
      }
      this.service.addReminder(dateBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.log('sucesssfull')
          this.sendDate.emit(dateBody);
          this.toEdit.emit(this.newDate)
        },
        error => {
          LoggerService.log('failed')
          throw error;
        })
    }
  }
/**
 * @description:this function will be used to to choose custom reminder
 */


  customReminder(){

    var  timePattern=/^(([0]?[1-9])|([1][0-2])):(([0-5][0-9])|([1-9])) [AP][M]$/
    var datePattern=/^(|(0[1-9])|(1[0-2]))\/((0[1-9])|(1\d)|(2\d)|(3[0-1]))\/((\d{4}))$/

    if(this.customDate==null){
      this.snackbar.open('please provide "mm/dd/yyyy" format only', 'close', {
        duration: 2500,
      });
      return -1;
    }
var newDate= new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate(),0,0,0,0);
    if(this.customDate<newDate)
    {
           this.snackbar.open('please provide upcoming date only', 'close', {
            duration: 2500,
          });
          return -1;   
    }
    
    if(!timePattern.test(this.customTime)){
      this.snackbar.open('please provide in "HH:MM am/pm" format only', 'close', {
        duration: 2500,
      });
      return -1;
    }

   if(this.customTime){
      var h=this.customTime.split(':');
      var hour=h[0];
      hour=Number(hour);
    var min=h[1].split(' ')[0];
    min=Number(min)
    if(h[1].split(' ')[1]=='PM'){
      hour=hour+12;
    }
    if(hour<new Date().getHours()){
      this.snackbar.open('please provide future Time', 'close', {
        duration: 2500,
      });
      return -1;
    }
    if(hour==new Date().getHours()){
      if(min<new Date().getMinutes()){
        this.snackbar.open('please provide future Time', 'close', {
          duration: 2500,
        });
        return -1;
      }
    }
   }
    
      if(this.hours!=null||this.hours!=undefined){
      this.newCustomDate =new Date(this.customDate.getFullYear(),this.customDate.getMonth(),this.customDate.getDate()+0,this.hours,0,0)
      this.hours=null;
    }

    else if(this.customTime.length>=5){
      var h=this.customTime.split(':');
      var hour=h[0];
      hour=Number(hour);
     var min=h[1].split(' ')[0];
     min=Number(min)
     if(h[1].split(' ')[1]=='pm'||h[1].split(' ')[1]=='PM'||h[1].split(' ')[1]=='Pm')
     {   
       hour=hour+12;
     }
     this.newCustomDate =new Date(this.customDate.getFullYear(),this.customDate.getMonth(),this.customDate.getDate()+0,hour,min,0)
     if (this.note == undefined) {
      this.sendToAdd.emit(this.newCustomDate);
    }
    if(this.note != null && this.note != undefined){
      var idlist = [];
      idlist.push(this.note.id)
     var dateBody = {
      "reminder": this.newCustomDate,
      "noteIdList": idlist
    }
    this.service.addReminder(dateBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
       LoggerService.log('reminder add sucessfull')
        this.sendDate.emit(dateBody);
        this.toEdit.emit(this.newCustomDate)
      },
      error => {
        LoggerService.log('failed')
        throw error;
      })
    }
    }

   
  }
  
  setCustomTime(data){
    if(data=='8am'){
      this.hours=8;
    }
    if(data=='1pm'){
      this.hours=13;
    }
    if(data=='6pm'){
      this.hours=18;
    }
    if(data=='8pm'){
      this.hours=20
    }
    if(this.hours>12){
      this.customTime=(this.hours-12)+':'+'00'+' PM'
    }
    else if(this.hours<=12){
      this.customTime=this.hours+':'+'00'+' AM'
    }
  }
  changeDate(){
    this.time1=false; 
    this.time2=false;
    this.time3=false;
    this.time4=false;
  }
  ngOnDestroy() {
  
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}

