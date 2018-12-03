import { Injectable } from '@angular/core';
import { UserService } from '../httpService/user.service';
@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  constructor( private service: UserService) { }

  addLabelToNote(noteid, labelid) {
    let url = 'notes/' + noteid + '/addLabelToNotes/' + labelid + '/add'
    return this.service.httpPostData(url, null)
  }
  removeLabelToNote(noteid, labelid) {
    let url = 'notes/' + noteid + '/addLabelToNotes/' + labelid + '/remove'
    return this.service.httpPostData(url, null)
  }

  getTrash() {
    let url = 'notes/getNotesList'
    return this.service.httpGetData(url);
  }

  restoreNotes(body) {
    let url = 'notes/trashNotes'
    return this.service.httpPostData(url, body);
  }
  pinUnpin(body) {
    let url = 'notes/pinUnpinNotes';
    return this.service.httpPostData(url, body);
  }
  getListByName(name) {
    let url = 'notes/getNotesListByLabel/' + name;
    return this.service.httpPostData(url, null)
  }

  deletecheck(checklistid, noteid) {
    let url = 'notes/' + noteid + '/checklist/' + checklistid + '/remove'
    return this.service.httpPostData(url, null)
  }

  updatecheck(checklistid, noteid, body) {
    let url = 'notes/' + noteid + '/checklist/' + checklistid + '/update'
    return this.service.httpPostData(url, body)
  }
  addchecktopopup(noteid, body) {
    let url = 'notes/' + noteid + '/checklist/add';
    return this.service.httpPostData(url, body)
  }

  updateCheckBox(checkboxId,noteId,body){
  let url='notes/'+noteId+'/checklist/'+checkboxId+'/update';
  return this.service.httpPostData(url,body)
  }

  createLabel(body){
    let url='noteLabels';
    return this.service.httpPostData(url,body);
  }
  getLabel(){
    let url='noteLabels/getNoteLabelList';
    return this.service.httpGetData(url);
  }
  deleteLabel(id){
    let url='noteLabels/'+id+'/deleteNoteLabel';
    return this.service.httpDeleteData(url);
  }
  updateLabel(id,body){
    let url="noteLabels/" + id + "/updateNoteLabel";
    return this.service.httpPostData(url,body);
  }
  addnote(body){
    console.log(body);
    let url='notes/addNotes'
    return this.service.httpPostEncoded(url,this.encode(body))
  }
  encode(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }

   getnotes(){
     let url='notes/getNotesList';
     return this.service.httpGetData(url);
   }

   deleteNote(body){
     let url='notes/trashNotes';
     return this.service.httpPostData(url,body)
   }

   changecolor(body){
     let url='notes/changesColorNotes';
     return this.service.httpPostData(url,body);
   }

   addArchive(body){
     let url='notes/archiveNotes';
     return this.service.httpPostData(url,body);
   }

   getarchive(){
     let url='notes/getArchiveNotesList';
     return this.service.httpGetData(url);
   }

   updatecard(body){
     let url='notes/updateNotes';
     return this.service.httpPostData(url,body)
   }

   updateProfile(body){
     let url='user/uploadProfileImage'
     return this.service.httpPostWithoutcontent(url,body)
   }

   deleteForever(body){
     let url='notes/deleteForeverNotes'
     return this.service.httpPostData(url,body)
   }
   addReminder(body){
    let url='notes/addUpdateReminderNotes'
    return this.service.httpPostData(url,body)
   }
   deleteReminder(body){
     let url='notes/removeReminderNotes';
     return this.service.httpPostData(url,body)
   }
   getRemindersList(){
     let url='notes/getReminderNotesList';
     return this.service.httpGetData(url);
   }
   getSpecificNoteDetails(noteID){
     let url='/notes/getNotesDetail/'+noteID
     return this.service.httpGetData(url);
   }
}
