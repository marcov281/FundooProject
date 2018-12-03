import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../core/service/dataService/search.service'
import { NoteServiceService } from  '../../core/service/noteService/note-service.service';
import {LoggerService} from '../../core/service/loggerService/logger.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  message:string;
  constructor(
    private someserv: SearchService,
    public service:NoteServiceService
  ) { }
public notes=[];
  ngOnInit() {
    this.someserv.currentMessage.subscribe(message => {this.message = message})  
    this.getNotes();
  }
  getNotes()
  {
    this.service.getnotes().subscribe(
      data=>{          
        this.notes=[];  
       for(var i=data["data"].data.length-1;i>=0;i--)
       {
         if(data["data"].data[i].isDeleted==false && data["data"].data[i].isArchived==false)
         {
          this.notes.push(data["data"].data[i])        
         }      
       }        
      },
      error=>{
        LoggerService.log('failed')
        throw error;     
      }
    )}
  
}
