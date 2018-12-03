/******************************************************************************
 *  Execution       :   1. default node         cmd> authroute.guard.ts 
 *
 *  Purpose         : this pogram is to validate the route and controlling the route 
 * 
 *  @description    
 * 
 *  @file           : authroute.guard.ts
 *  @overview       : to logging in an admin
 *  @module         : authroute.guard.ts - This is optional if expeclictly its an npm or local package
 *  @author         : soumallya mondal
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/

 //importing the various module that is needed for this programe to execute
 import { Injectable } from '@angular/core';
 import { CanActivate } from '@angular/router';
 
 @Injectable({
   providedIn: 'root'
 })
 //exporting the  AuthrouteGuard class to the file 
 export class AuthrouteGuard implements CanActivate {
   canActivate() {
     //checking the condition if it is null or not
     if(window.localStorage.getItem('token')!=null)
     {
       return true;//ifnot null then semding the true value
     }
     else 
     {
       //else if it empty then sending to login
       window.location.href="/login"
       return;
     }
   }
 }
 