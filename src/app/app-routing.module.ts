/**
 * importing all the routing module
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { HomeComponent } from './components/home/home.component'
import { NotesComponent } from './components/notes/notes.component';
import { TrashComponent } from './components/trash/trash.component'
import {ListArchiveComponent} from './components/list-archive/list-archive.component' 
import {SearchComponent} from './components/search/search.component'
import{ MylabelComponent} from './components/mylabel/mylabel.component'
import { RemindersComponent } from './components/reminders/reminders.component';
import {AuthrouteGuard} from './core/authguard/authguard.service'
import { InternetErrorComponent } from './components/internet-error/internet-error.component';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { QAComponent } from './components/qa/qa.component';

//creating routes
const routes: Routes = [
  { path: '',pathMatch:'full',redirectTo:'/login'},
  { path: 'login', component: LoginComponent },//login routes
  { path: 'signup', component: SignupComponent },//signup routes
  { path: 'forgot_pass', component: ForgotPasswordComponent },//forgot password
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: '', component: HomeComponent, canActivate:[AuthrouteGuard], children: [
      { path: 'home', component: NotesComponent},
      { path: 'reminder', component: RemindersComponent },
      {path:'trash',component:TrashComponent},
      {path:'archive',component:ListArchiveComponent},
      { path: 'search', component: SearchComponent },
      { path: 'label/:label', component: MylabelComponent },
      { path: 'questionAnswer/:noteId', component: QAComponent },
    ]
  },
  {path:'interneterror',component:InternetErrorComponent},
  {path:'httperror',component:HttpErrorComponent}

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
