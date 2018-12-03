import { Injectable } from '@angular/core';
import { UserService } from '../httpService/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private service: UserService,) { }

getData(){     //creating get method for a get request
  let url="user/service"
  return  this.service.httpGetWithoutToken(url);  //concatinating both url 
  }
signUp(body){
  let url="user/userSignUp"
  return this.service.httpPostWithoutToken(url,body);
}

loggingin(body){
  let url="user/login";
  return this.service.httpPostWithoutToken(url,body);
}

forgotPassword(body){
  let url="user/reset"
  return this.service.httpPostWithoutToken(url,body);
}
loggingout(){
  let url='/user/logout';
  return this.service.httpPostData(url,null)
}
regusterPushToken(body){
  let url='user/registerPushToken'
  return this.service.httpPostData(url,body);
}

searchUserList(body){
  let url='user/searchUserList'
  return this.service.httpPostData(url,body);
}

addCollaborator(id,body){
  let url='notes/'+id+'/AddcollaboratorsNotes'
  return this.service.httpPostData(url,body);
}
deleteCollaborator(note,user){
  console.log('in colla',user);
  let url="notes/"+note.id+"/removeCollaboratorsNotes/"+user.userobj.userId;
  return this.service.httpDeleteData(url);
}

}
