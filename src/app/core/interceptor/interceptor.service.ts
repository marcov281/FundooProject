import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, 
  HttpRequest,HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {

	constructor() { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    	// modify request
	    request = request.clone({
	      setHeaders: {
	        Authorization: `${localStorage.getItem('token')}`
	      }
	    });
	   
	 	// console.log(request);

	    return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            // http response status code
	            // console.log(event.status);
	          }
	        }, error => {
	   			// http response status code
	          	// console.log("----response----");
	          	// console.error(error.status);
	          	// console.error(error.message);
	          	// console.log("--- end of response---");

	        })
	      )
    };
}

