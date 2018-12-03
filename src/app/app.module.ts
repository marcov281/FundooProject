/**
 * importing all the angular module that is needed for the project
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './material'
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }   from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesComponent } from './components/notes/notes.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { RemindersComponent } from './components/reminders/reminders.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { ThemeComponent } from './components/theme/theme.component';
import { MoreComponent } from './components/more/more.component';
import { TrashComponent } from './components/trash/trash.component';
import { AddArchiveComponent } from './components/add-archive/add-archive.component';
import { ListArchiveComponent } from './components/list-archive/list-archive.component';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserLabelComponent } from './components/user-label/user-label.component';
import { UserlabeldialogComponent } from './components/userlabeldialog/userlabeldialog.component';
import { SearchPipe } from './core/pipe/search.pipe';
import { SearchComponent } from './components/search/search.component';
import { MylabelComponent } from './components/mylabel/mylabel.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { SearchLabelPipe } from './core/pipe/search-label.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RemindmeComponent } from './components/remindme/remindme.component';
import {MatNativeDateModule} from '@angular/material'
import {LoggerService} from './core/service/loggerService/logger.service'
import { MessagingService } from './core/service/notification/push-notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {InterceptorService} from './core/interceptor/interceptor.service';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { CollaboratorDialogComponent } from './components/collaborator-dialog/collaborator-dialog.component';
import { InternetErrorComponent } from './components/internet-error/internet-error.component';
import { HttpErrorComponent } from './components/http-error/http-error.component'
import { GlobalErrorHandlerService } from './core/service/errorHandler/global-error-handler.service';
import { QAComponent } from './components/qa/qa.component';
import {RatingModule} from "ngx-rating/index.js";
import { BarRatingModule } from "ngx-bar-rating";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavbarComponent,
    NotesComponent,
    RemindersComponent,
    AddNotesComponent,
    NoteCardComponent,
    ThemeComponent,
    MoreComponent,
    TrashComponent,
    AddArchiveComponent,
    ListArchiveComponent,
    EditNotesComponent,
    UserLabelComponent,
    UserlabeldialogComponent,
    SearchPipe,
    SearchComponent,
    MylabelComponent,
    ImageCropperComponent,
    SearchLabelPipe,
    RemindmeComponent,
    CollaboratorComponent,
    CollaboratorDialogComponent,
    InternetErrorComponent,
    HttpErrorComponent,
    QAComponent


   
  ],
  //imporing the class 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ClickOutsideModule,
    MatDialogModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RatingModule,
    BarRatingModule
  ],

  providers: [LoggerService,MessagingService,InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },GlobalErrorHandlerService,{ provide: ErrorHandler, useClass: GlobalErrorHandlerService } ],

  bootstrap: [AppComponent],
  entryComponents:[ImageCropperComponent,NavbarComponent,EditNotesComponent,
    NoteCardComponent,UserLabelComponent,UserlabeldialogComponent,
    CollaboratorDialogComponent,CollaboratorComponent,AddNotesComponent],

})
export class AppModule { }
