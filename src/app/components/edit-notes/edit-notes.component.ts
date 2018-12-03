/******************************************************************************
 *  Execution       :   1. default node         cmd> edit-notes.component.ts 
 *
 *  Purpose         : this pogram is to redirect the valid admin to the dashboard 
 *  @description    
 * 
 *  @file           : edit-notes.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : edit-notes.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../core/service/httpService/user.service';
import { MatSnackBar } from '@angular/material';
import { NoteServiceService } from '../../core/service/noteService/note-service.service'
import { LoggerService } from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//importing all the module required
@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
//exporting class
export class EditNotesComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public name = null;
  public newcolor = this.data.color;
  public checkitem = [];
  public listarray = [];
  public tempArray = [];
  public listval;
  public statusCheck;
  public reminder;

  constructor(public dialogRef: MatDialogRef<EditNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //fetching data object received from note-card component
    private service: UserService,
    private snackbar: MatSnackBar,
    private noteservice: NoteServiceService
  ) { }

  ngOnInit() {
    this.getchecklist();
    this.reminder = this.data.reminder[0]
    console.log(this.reminder);
  }
  //to close the mat dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
  //----------------------------------------------------------------------------------
  /**
   * @description:this method down below is to update the card 
   */
  //------------------------------------------------------------------------------------
  updatecard() {

    var title = document.getElementById("title").innerHTML;
    var description = document.getElementById("description").innerHTML;

    var body = {
      "noteId": this.data.id,
      "title": title,
      "description": description
    }
    //calling the service method in service file
    this.noteservice.updatecard(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.snackbar.open('Notes sucessfully Updated ', 'close', {
            duration: 1500,
          });
        },
        error => {
          LoggerService.log('error in update')
          throw error;
        }
      )
  }
  changeColor(event) {
    this.newcolor = event
  }
  shownote(event) {
    if (event == '2') {
      this.dialogRef.close();
    }
  }
  editcheck(data) {
    this.name = data;
  }

  onKeydown(event) {
    if (event.key === "Enter" && event.target.value.length != 0 && event.target.value.trim().length != 0) {
      var obj = {
        "itemName": this.listval,
        "status": 'open'
      }
      this.listval = null;
      this.noteservice.addchecktopopup(this.data.id, obj)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            LoggerService.log('sucessfull add')
            this.tempArray.push(response["data"].details);
          },
          error => {
            throw error;
            LoggerService.log('failed')
          })
    }
  }

  deleteChecked(note, data) {
    this.noteservice.deletecheck(note.id, data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.log('delete sucessfull')
          this.checkitem.splice(this.checkitem.indexOf(note), 1);
        },
        error => {
          throw error;
          LoggerService.log('failed')
        }
      )
  }

  getchecklist() {
    this.checkitem = [];
    for (var i = 0; i < this.data.noteCheckLists.length; i++) {
      this.checkitem.push(this.data.noteCheckLists[i])
    }
  }

  deleteFromTemp(note) {
    this.tempArray.splice(this.tempArray.indexOf(note), 1);
  }
  public object;

  checkboxUpdate(checkitem) {
    if (checkitem.status == "close") {
      checkitem.status = "open";
    }
    else if (checkitem.status == "open") {
      checkitem.status = "close"
    }
    this.object = checkitem;
    this.update(this.object, checkitem)

  }

  updateCheckName(event, checkitem) {

    if (event.key == "Enter" && event.target.value.length != 0
      && event.target.value.trim().length != 0) {
      this.object = checkitem;
      this.update(this.object, checkitem)
    }
  }
  update(object, checkitem) {
    this.noteservice.updateCheckBox(checkitem.id, this.data.id, object)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.snackbar.open('Notes sucessfully Updated ', 'close', {
            duration: 1500,
          });
        },
        error => {
          this.snackbar.open('Notes Update failed ', 'close', {
            duration: 1500,
          });
          throw error;
        })
  }

  removeReminder(note, reminder) {
    var idList = [];
    idList.push(note.id);
    var dateBody = {
      "reminder": reminder,
      "noteIdList": idList
    }
    this.noteservice.deleteReminder(dateBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.log('sucessfull')
          note.reminder.pop();
          this.reminder = null;
        },
        error => {
          LoggerService.log('failed')
          throw error;
        })
  }

  getReminderChip(event) {
    this.reminder = event
  }

  removeChip(note, labelId) {
    this.noteservice.removeLabelToNote(note.id, labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.log('remove sucessfull')
          for (var i = 0; i < note.noteLabels.length; i++) {
            if (labelId == note.noteLabels[i].id) {
              note.noteLabels.splice(i, 1);
            }
          }
        }, error => {
          LoggerService.log('failed')
          console.log(error);
          throw error;
        })
  }

  updateLabel(event) {
    this.data.noteLabels.push(event);
  }

  changePin(note) {
    var idList = [];
    idList.push(note.id);
    var body = {
      "isPined": !note.isPined,
      "noteIdList": idList
    }
    this.noteservice.pinUnpin(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.data.isPined = !note.isPined
          LoggerService.log('sucess in popup')
        },
        error => {
          LoggerService.log('failed in popup')
          console.log(error);
          
          throw error;
        })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
