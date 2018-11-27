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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { UserService } from  '../../core/service/httpService/user.service';
import {Router} from '@angular/router'
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public token;
  constructor(
    private route: ActivatedRoute,
    public snackbar:MatSnackBar,
    public service:UserService,
    public router:Router,
    
  ) { }
 
  ngOnInit() {
     this.token=this.route.snapshot.params['token'];  
     }

  model:any={}

  reset()
  {

    localStorage.setItem('token',this.token);
      var password=this.model.password;
      var confirm_password=this.model.confirm_password;

      if(password==''||password==undefined||confirm_password==''||confirm_password==undefined||password!=confirm_password)
      {
        this.snackbar.open('password did not matched,try valid password', 'close', {
          duration: 2000,
        });
        return;
      }

      this.service.ResetPassword("/user/reset-password",{"newPassword":password},this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          LoggerService.logdata("POST Request is successful ", data)
            this.snackbar.open('password change sucessfull', 'redirecting...', {
              duration: 2000,
            });
            this.router.navigate(['home'])
        },
        error => {
            LoggerService.logdata("Error", error)
            this.snackbar.open('oops something not correct', 'try again', {
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


