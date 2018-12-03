/******************************************************************************
 *  Execution       :   1. default node         cmd> note-card.component.ts 
 *
 *  Purpose         : this is to get the array of updated card and to print in a looop
 *  @description    
 * 
 *  @file           : note-card.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : qa.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 02-12-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteServiceService } from '../../core/service/noteService/note-service.service';
import { QuestionAnswerService } from '../../core/service/questionAnswer/question-answer.service';
import { LoggerService } from '../../core/service/loggerService/logger.service';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QAComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public noteId: string;
  public note;
  public qaObject;
  public inputMessage: string;
  public questionAsked: string;
  public imagePath;
  public likeValue: boolean = false;
  public count;
  public rate;
  public inputReply:string;
  public qaArray=[];
  public matInput=false;
  public replyArray=[];
  public replyLikeCount=0;
  public avgRating;
  public likeInReply:boolean=false;
  public replyImageUrl:string
  public replyAvgRate;
  public rateOfReply;
  public hideInputReply:string;
  public inputReplyLabel2;
  public replyOfReplyArray=[];
  public replyId:string;
  public questionBody;
  public reply2ndLabel:boolean=false;
  constructor(private route: ActivatedRoute,
    private noteservice: NoteServiceService,
    private service: QuestionAnswerService, ) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.noteId = params['noteId'];
      })
    this.getNoteDetails();
    this.replyImageUrl='http://34.213.106.173/'+localStorage.getItem('imageUrl');
  }

/**
 * 
 * @param event this is to ask question in the note that is one time
 */
  question(event) {
    if (event.key === "Enter" && event.target.value.length != 0 &&
      event.target.value.trim().length != 0) {
      this.questionAsked = event.target.value;
      this. questionBody = {
        "message": this.questionAsked,
        "notesId": this.note.id
      }
      this.service.askQuestion(this.questionBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.data(data)
          this.getNoteDetails();
        },
        error => {
          LoggerService.data(error);
        }
      )
    }
  }

  getNoteDetails() {
    this.noteservice.getSpecificNoteDetails(this.noteId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {    
        this.replyArray=[]; 
        this.count = 0;
        this.avgRating=0;
        this.note = data['data'].data[0];

        for(var i=0;i<this.note.questionAndAnswerNotes.length;i++){
            if(!("parentId" in this.note.questionAndAnswerNotes[i])){
              this.qaObject=this.note.questionAndAnswerNotes[i]
            }
        }          
        this.qaArray=data['data'].data[0].questionAndAnswerNotes;
        LoggerService.data(this.qaObject);
        this.imagePath = 'http://34.213.106.173/' + this.qaObject.user.imageUrl;
        //checking if the question is liked by the user or not
        for (var i = 0; i < this.qaObject.like.length; i++) {
          if (this.qaObject.like[i].userId == localStorage.getItem('userid') && this.qaObject.like[i].like == true) {
            this.likeValue = true;
          }
          if (this.qaObject.like[i].userId == localStorage.getItem('userid') && this.qaObject.like[i].like == false) {
            this.likeValue = false;
          }
        }
        //checking ends here
        //this is counting the no of likes of a message
        for (var i = 0; i < this.qaObject.like.length; i++) {
          if (this.qaObject.like[i].like == true) {
            this.count++;
          }
        }
        //this is to give the personal rating to a client     
        let rating=0;  
        for (let j = 0; j < this.qaObject.rate.length; j++) {
          rating=rating+this.qaObject.rate[j].rate;
          if (this.qaObject.rate[j].userId == localStorage.getItem('userid')) {
            this.rate = this.qaObject.rate[j].rate
            LoggerService.logdata('rate is', this.rate);
          }
        } 
        if(this.qaObject.rate.length>0){
          this.avgRating=rating/this.qaObject.rate.length;
        }
        else{
          this.avgRating=0;
        }
       
        
        
        //parsonal rating ends here

        //this is the logic to print the reply array
         for(var i=1;i<this.qaArray.length;i++){
           if(this.qaArray[i].parentId== this.qaObject.id){
             this.replyArray.push(this.qaArray[i])
           }
         }      
         //this.is the end to print the reply array
      },
      error => { }
    )
  }

  likeQuestion(data) {
    let likeBody;
    if (data == 'true') {
      likeBody = {
        "like": false,
      }
    }
    else likeBody = {
      "like": true,
    }
    this.service.likeQuestion(this.qaObject.id, likeBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.getNoteDetails();
      },
      error => {
        console.log('failed');
      })
  }

  changeRating(data) {
    let rateBody = {
      "rate": data
    }
    this.service.changeRating(this.qaObject.id, rateBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.getNoteDetails();
      },
      error => { console.log('rated error', error) }
    )
  }

  replyToQuestion(){
    if(this.inputReply.trim()!=null||this.inputReply.trim()!=undefined){
    let replyBody={
      "message":this.inputReply,
    }
    this.service.replyToquestion(this.qaObject.id,replyBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data=>{
        this.inputReply=null;
        this.getNoteDetails();
      },
      error=>{console.log(error);
      }
    )}
  }

  likeCountInReply(data){
    this.replyLikeCount=0;
    for(let i=0;i<data.like.length;i++){
      if(data.like[i].like==true){
        this.replyLikeCount++;
      }    
    }  
    return this.replyLikeCount; 
  }

  likeReply(value,obj){
    var likeBody;
    if(value=='true'){
      likeBody = {
        "like": false,
      }
    }
    else if(value=='false'){
      likeBody = {
        "like": true,
      }
    }
    this.service.likeQuestion(obj.id, likeBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        console.log('sucuss',data);
        
        this.getNoteDetails();
      },
      error => {
        console.log('failed');
      })
  }

  checkLike(data){
    if(data.like.length>0){
      var arr=data.like;
    for(var i=0;i<arr.length;i++){
      if(arr[i].userId==localStorage.getItem('userid') && arr[i].like==true){
        return true;
      }
      else if(arr[i].userId==localStorage.getItem('userid') && arr[i].like==false){
        return false;
      }
      else return false;
    }}
    else 
    return false;
  }
//this is the starting of the 1st label reply function list
  changeRatingToReply(data,id){
    let rateBody = {
      "rate": data
    }
    this.service.changeRating(id, rateBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        console.log('sucessfull rate change');
        
        this.getNoteDetails();
      },
      error => { console.log('rated error', error) }
    )
  }

  checkRateInReply(data){
    if(data.rate.length>0){
      var rate=0;
      for(let i=0;i<data.rate.length;i++){
        rate=rate+data.rate[i].rate
      }
      this.replyAvgRate=rate/data.rate.length;
      return true;
    }
    if(data.rate.length==0){
      this.replyAvgRate=0;
      return true;
    }
  }

  replyRating(rate){
    if(rate.length>0){
      for(var i=0;i<rate.length;i++){
        if(rate[i].userId ==localStorage.getItem('userid')){
          this.rateOfReply= rate[i].rate;
          return true;  
        }
       else if(rate[i].userId !=localStorage.getItem('userid')){
          return true;
        }
      }
    }
    else if(rate.length==0){
      this.rateOfReply=0;
      return true;
    }
  }
//this is the ending of the 1st label reply function list
  replyInput(id){
    this.hideInputReply=id;
  }

  replyToReply(data){
    this.reply2ndLabel=!this.reply2ndLabel;
    if(this.inputReplyLabel2.trim()!=null||this.inputReplyLabel2.trim()!=undefined){
      let replyBody={
        "message":this.inputReplyLabel2,
      }
      this.service.replyToquestion(data.id,replyBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data=>{
          this.inputReplyLabel2=null;
          this.getNoteDetails();
         this.getreplyOfReply(data);
          
        },
        error=>{console.log(error);
        }
      )}
  }

  getreplyOfReply(data){
    this.hideInputReply=null;
    this.replyId=data.id
    this.reply2ndLabel=!this.reply2ndLabel;
    this.replyOfReplyArray=[];
    for(let i=0;i<this.qaArray.length;i++){
      if(this.qaArray[i].parentId==data.id){
        this.replyOfReplyArray.push(this.qaArray[i])
      }
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
