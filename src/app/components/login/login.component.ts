/******************************************************************************
 *  Execution       :   1. default node         cmd> add-archive.component.ts 
 *
 *  Purpose         : this pogram is to redirect the valid admin to the dashboard 
 *  @description    
 * 
 *  @file           : add-archive.component.ts
 *  @overview       : to show the dashboard to an admin
 *  @module         : add-archive.component.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
/**
 * importing all thhe file from various module
 */
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/service/userService/client.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'
import { LoggerService } from '../../core/service/loggerService/logger.service'
import { takeUntil } from 'rxjs/operators';

//creating component module
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
//creating and exporing component class
export class LoginComponent implements OnInit {
destroy$: Subject<boolean> = new Subject<boolean>();
public emailIsInvalid:boolean=false;
  constructor(public service: ClientService,
    public snackbar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null ||localStorage.getItem('token')!=undefined){
      window.location.href="/home"
    }
  }
  model: any = {}

  login() {
    var pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!pattern.test(this.model.email)){
      console.log('hii');
      this.snackbar.open('Please give email in proper format', 'close', {
        duration: 1000,
      })
      return -1;
    }

    if( this.model.password.length<=4){
      this.snackbar.open('password should be minimum 5 digit', 'close', {
        duration: 1000,
      }) 
      return -1;
    }

    this.service.loggingin({
      "email": this.model.email,
      "password": this.model.password
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.snackbar.open('login sucessfull', 'redirecting to dashboard...', {
          duration: 1000,
        });
        LoggerService.logdata("token successful ", data)
        localStorage.setItem('token', data["id"]);
        localStorage.setItem('email', data["email"]);
        console.log( data["email"]);
        localStorage.setItem('firstName', data["firstName"])
        localStorage.setItem('lastName', data["lastName"])
        localStorage.setItem('userid', data["userId"]);
        localStorage.setItem('imageUrl', data["imageUrl"]);
        var item = localStorage.getItem("pushToken")
        var body = {
          "pushToken": item
        }
        this.service.regusterPushToken(body).subscribe(
          data => {
            LoggerService.log('push token register sucessfull')
            LoggerService.data(data)
          },
          error => {
            LoggerService.log('error in register')
            throw error;
          }
        )
        this.router.navigate(['/home']);
      },
      error => {
        LoggerService.logdata("token successful ", error)
        this.snackbar.open('login unsucessfull,please try again', 'close', {
          duration: 2000,
        });
        throw error;
      }
    );

  }

  ngOnDestroy() {
   
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}


