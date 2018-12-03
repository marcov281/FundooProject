/**
 * importing module from angular core
 */
import { Component, OnInit , HostListener} from '@angular/core';
import { ClientService } from  '../../core/service/userService/client.service';
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/service/loggerService/logger.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//creating component

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

//creating signupcompont class and exporting it
export class SignupComponent implements OnInit { //it will start on initiallization
  destroy$: Subject<boolean> = new Subject<boolean>();

  public show = []; //creating a blank array
  public count=0;
  public  cards:  Array<object> = []; //creating an card  array of object
  public index_new=0;
  
  //defining model
  model:any={};
  public card=null;

public fir_name=false
//crating constructor
  constructor( private  service:  ClientService,//defining services
              // private postservice:UserService,
              public snackbar:MatSnackBar
              ) {}


//on initialization it will start getservice() methid
  ngOnInit() {
    this.getService();
  }

/**
 * this method will print all the cards coming from the backend
 */
  public getService()
  {
    this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:  Array<object>) => {
     var obj=data["data"];
     for(var i=0;i<obj.data.length;i++){
       this.cards.push(obj.data[i])
     }

     for(var i=0;i<obj.data.length;i++)
     {
       this.show.push(false);
     }
  });
}
//this is the selection of cards 
onMouseClick(index){
  
  this.show[index] = !this.show[index]; //toggloning true and false
  var prev_index=index; //strong the index
  this.card=index;
  if(this.count!=0){  //of click>0 then making the previous stored index uncheck
    this.show[this.index_new] = false;
    
  }
  this.index_new=prev_index; 
  this.count++;   //incrementing count
}

/**
 * this function will sign up the user with all the user details
 * it will also validate the customer
 */
signup()
{
  var first_name=this.model.fName;
  var l_name=this.model.lName;
  var email=this.model.email;
  var password=this.model.password;
  var confirm_Pass=this.model.confirm_password;
  let namePattern=/[a-z]{1,10}/
  let emailPattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if(!namePattern.test(first_name))
  {
    this.snackbar.open('please provide valid first name', 'close', {
      duration: 2000,
    });
    return -1;
  }

  else if(!namePattern.test(l_name))
  {
    this.snackbar.open('please provide valid last name', 'close', {
      duration: 2000,
    });
    return -1;
  }
  else if(!emailPattern.test(email))
  {
    this.snackbar.open('please provide valid email id', 'close', {
      duration: 2000,
    });
    return -1;
  }
  else if(password==''||password.length<4||password===undefined)
  {
    this.snackbar.open('please provide min 4 digit', 'close', {
      duration: 2000,
    });
    return -1;
  }
  else if(password!=confirm_Pass||confirm_Pass===undefined)
  {
    this.snackbar.open('password and confirmpassword did not matched', 'close', {
      duration: 2000,
    });
    return -1;
  }
  else if(this.cards[this.card]["name"]===undefined||this.cards[this.card]["name"]==null)
  {
    this.snackbar.open('Please choose a service ', 'close', {
      duration: 2000,
    });
    return -1;
  }
  
 //posting the request of registration (http)
 this.service.signUp(
{
  "firstName": first_name.toLowerCase().trim(),//assigning value to object
  "lastName":l_name.toLowerCase().trim(),//assigning value to object
  "service": this.cards[this.card]["name"],//assigning value to object
  "email":email.toLowerCase().trim(),//assigning value to object
  "emailVerified": true,//assigning value to object
  "password":password,//assigning value to object
}
)
.pipe(takeUntil(this.destroy$))
.subscribe(
  data => {
      LoggerService.logdata("POST Request is successful ", data)
      this.snackbar.open('registration sucessfull', 'close', {
        duration: 3000,
      });

  },
  error => {
      LoggerService.logdata("Error", error)
      this.snackbar.open('registration unsucessfull,please try again', 'close', {
        duration: 3000,
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

