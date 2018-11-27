import { Component, OnInit } from '@angular/core';
import { ClientService } from  '../../core/service/userService/client.service';
import {MatSnackBar} from '@angular/material';
import { LoggerService } from '../../core/service/loggerService/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public service:ClientService,
              public snackbar:MatSnackBar,
              
  ) { }

  ngOnInit() {
  }
  model:any={}

  forgot(){

      var email=this.model.forgot_email;
      if(email==''||email==undefined)
      {
      this.model.email_bool=true;
      return;
      }

      this.service.forgotPassword({
        "email":email.toLowerCase(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
            LoggerService.logdata('POST Request is successful',data)
            this.snackbar.open('check your mail for reset link', 'close', {
              duration: 2000,
            });
      
        },
        error => {
          LoggerService.logdata('POST Request is successful',error)
            this.snackbar.open('invalid email found', 'try again', {
              duration: 2000,
            });
            throw error;
        }
      )}

      ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
      }


}
