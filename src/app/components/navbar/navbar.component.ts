import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../core/service/userService/client.service';
import { MatSnackBar } from '@angular/material';
import { SearchService } from '../../core/service/dataService/search.service'
import { MatDialog } from '@angular/material';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component'
import { ActivatedRoute ,ParamMap} from '@angular/router';
import {MessagingService} from '../../core/service/notification/push-notification.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private isSelected:boolean=false;
  private isReminder:boolean=false;
  private isArchived:boolean=false;
  private isTrashed:boolean=false;
  private name = '';
  private mail = '';
  private letter = ''
  private log: boolean = false;
  private message: string;
  private searchInput;
  private clear: false;
  private path;
  private imagePath;
  private view:boolean=true;
  private width;
  private heading;


  constructor(private router: Router,
          private service: ClientService,
          private snackbar: MatSnackBar,
          private someserv: SearchService,
          private dialog: MatDialog,
          private route:ActivatedRoute,
          private notification:MessagingService
  ) { }

  ngOnInit() {

    this.name = localStorage.getItem('firstName') + '  ' + localStorage.getItem('lastName');
    this.mail = localStorage.getItem('email');
    this.path = localStorage.getItem('imageUrl');
    this.letter = this.name[0];
    this.imagePath = 'http://34.213.106.173/' + this.path
    this.isLargeScreen();

    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {
        console.log( params['params'].label);
        this.heading = params['params'].label;
        
      })

    if(this.router.url=="/home"){
      this.isSelected=true
      this.isReminder=false;
      this.isArchived=false;
      this.isTrashed=false;
      this.heading="Fundoo Note"
    }
    if(this.router.url=="/archive"){
      this.isSelected=false
      this.isReminder=false;
      this.isArchived=true;
      this.isTrashed=false;
      this.heading="Archived Notes"
    }
    if(this.router.url=="/reminder"){
      this.isSelected=false;
      this.isReminder=true;
      this.isArchived=false;
      this.isTrashed=false;
      this.heading="Reminder Notes"
    }
    if(this.router.url=="/trash"){
      this.isSelected=false;
      this.isReminder=false;
      this.isArchived=false;
      this.isTrashed=true;
      this.heading="Trash Notes"
    }

  }

  goToReminder() {
    this.someserv.deSelect('null');
    this.isSelected=false;
    this.isReminder=true;
    this.isArchived=false;
    this.isTrashed=false;
    this.heading="Reminder Notes"
    this.router.navigate(['/reminder']);
  }

  goToNotes() {
    this.someserv.deSelect('null');
    this.isSelected=true;
    this.isReminder=false;
    this.isArchived=false;
    this.isTrashed=false;
    this.heading="Fundoo Keep"
    this.searchInput = null;
    this.router.navigate(['/home'])
  }

  gotoarchive() {
    this.someserv.deSelect('null');
    this.isSelected=false;
    this.isReminder=false;
    this.isArchived=true;
    this.isTrashed=false;
    this.heading="Archived Notes"
    this.searchInput = null;
    this.router.navigate(['/archive'])

  }

  gototrash() {
    this.someserv.deSelect('null');
    this.isSelected=false;
    this.isReminder=false;
    this.isArchived=false;
    this.isTrashed=true;
    this.heading="Trash Notes"
    this.searchInput = null;
    this.router.navigate(['/trash'])
  }

  gotosearch() {
    this.someserv.deSelect('null');
    this.searchInput = null;
    this.someserv.changeMessage(this.searchInput);
    this.router.navigate(['/search'])
  }

  gotoLabel(){
    this.isSelected=false;
    this.isReminder=false;
    this.isArchived=false;
    this.isTrashed=false;
  }

  logout() {
    this.service.loggingout()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        localStorage.removeItem('firstName');
        localStorage.removeItem('email');
        localStorage.removeItem('lastName');
        localStorage.removeItem('token');
        this.snackbar.open('logout sucessfull', 'close', {
          duration: 1000,
        });
        this.router.navigate(['/login']);
        return;
      },
      error => {
        this.snackbar.open('something went wrong', 'close', {
          duration: 1000,
        });
        throw error;
      })
  }
  change(event) {
    this.someserv.changeMessage(this.searchInput);
  }


  onFileChanged(event) {
    if (event.target.files[0] != undefined && event.target.files.length == 1) {
      var file = event
      this.openDialog(file);
    }
  }

  openDialog(file): void {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      width: '500px',//
      data: file
    });
    dialogRef.afterClosed().subscribe(result => {
      this.path = localStorage.getItem('imageUrl')
      this.imagePath = 'http://34.213.106.173/' + this.path
    });
  }

  changeView(){
  this.view=!this.view;
  if(this.view==true){
    
  this.someserv.changedata(true)
  }
  else if(this.view==false){
    this.someserv.changedata(false)
  }
  }

  edit(){
    this.someserv.changecurr("true")
  }
  isLargeScreen() {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

  receiveName(event){
    this.heading=event
  }

  sendNotification(){
    this.notification.getPermission();
  }

  ngOnDestroy() {
  
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
