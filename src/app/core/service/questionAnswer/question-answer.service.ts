import { Injectable } from '@angular/core';
import { UserService } from '../httpService/user.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {

  constructor(private service:UserService) { }

  askQuestion(body){
    let url='questionAndAnswerNotes/addQuestionAndAnswer'
    return this.service.httpPostData(url,body)
  }
  likeQuestion(id,body){
    let url='questionAndAnswerNotes/like/'+id;
    return this.service.httpPostData(url,body);
  }
  changeRating(id,body){
    let url='questionAndAnswerNotes/rate/'+id;
    return this.service.httpPostData(url,body);
  }

  replyToquestion(parentId,body){
    let url='questionAndAnswerNotes/reply/'+parentId;
    return this.service.httpPostData(url,body);
  }
}
