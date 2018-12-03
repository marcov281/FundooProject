/**
 * @description: imporing all the angular material api from
 * angular.material.io
 */
import {MatButtonModule,MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';


//both importing and exporting the material class
@NgModule({
    imports:[MatChipsModule,MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatCardModule,MatIconModule,MatSnackBarModule,ReactiveFormsModule,MatToolbarModule,MatInputModule,MatSidenavModule,MatListModule,MatTooltipModule,MatMenuModule],
    exports:[MatChipsModule,MatButtonModule,MatCheckboxModule,MatFormFieldModule,MatCardModule,MatIconModule,MatSnackBarModule,ReactiveFormsModule,MatToolbarModule,MatInputModule,MatSidenavModule,MatListModule,MatTooltipModule,MatMenuModule]
})
export class MaterialModule{}