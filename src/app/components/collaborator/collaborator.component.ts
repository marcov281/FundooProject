import { Component, OnInit,Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

@Input() note:object
  constructor(private dialog: MatDialog,) { }

  ngOnInit() {
  }

  opedCollaborator(){
  const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
   maxWidth:"auto",
    data: this.note
  } 
);
//------------------------------------------------------------------------------------------
  dialogRef.afterClosed().subscribe(result => {
  });
  }
  
}
