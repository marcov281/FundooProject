import { Injectable,ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{
 
  constructor(private snackbar:MatSnackBar,private injector: Injector ) {}
 
 
  handleError(error: any): void {
    // let router = this.injector.get(Router);
    //   console.log('URL: ' + router.url);
    // console.log(error);
    
      if (error instanceof HttpErrorResponse ) {		  
        if(!error.status){
          window.location.href = '/interneterror'                                                                            
        }
        if(error.status==500){
          this.snackbar.open('internal server error contact Administrator', 'close', {
            duration: 2500,
          })
        }
        else{
          this.snackbar.open('failed to load resource', 'close', {
            duration: 2500,
          })
        }      
    }

  //  else if(error instanceof TypeError || error instanceof ReferenceError){
  //     this.snackbar.open('Some error happened please contact the Administrattor', 'close', {
  //       duration: 2500,
  //     })
  //   }

    // else{
    //   this.snackbar.open('some error happened', 'close', {
    //     duration: 2500,
    //   })
    // }
  
}
}
