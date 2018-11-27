import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteServiceService } from '../../core/service/noteService/note-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input()
  note: any;

  @Output()
  colorChange=new EventEmitter();

  // public theme = false;

  constructor(private service: NoteServiceService) { }

  ngOnInit() {
   
  }

  setcolor(str) { 
    if(this.note==undefined)
    {
      this.colorChange.emit(str);
      return;
    }
    
    var idlist = []
    idlist.push(this.note.id);

    var body = {
      "color": str,
      "noteIdList": idlist
    }
    this.service.changecolor(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(

      data => {
      this.colorChange.emit(this.note);
      this.colorChange.emit(str);
      },
      error => {
        throw error;
      }
    )}
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
