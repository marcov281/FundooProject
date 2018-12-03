import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import {Note} from '../../core/Model/note'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-mylabel',
  templateUrl: './mylabel.component.html',
  styleUrls: ['./mylabel.component.scss']
})
export class MylabelComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public notes = [];
  public labelName;
  constructor(private route: ActivatedRoute, 
    private service: NoteServiceService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.labelName = params['label']
        this.getList();
      })
    this.getList();
  }
  getList() {
    return this.service.getListByName(this.labelName)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        LoggerService.log('sucess')
        this.notes=[];
        var noteList:Note[]=data['data'].data
        for (var i = noteList.length-1; i>=0; i--) {
          this.notes.push(noteList[i])
        }
      },
      error => {
        LoggerService.log('failed');
        throw error;
      })
  }
  onAdding($event){
    this.getList();
  }
  updateCard(event){
    this.getList();
  }

  ngOnDestroy() {
  
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
