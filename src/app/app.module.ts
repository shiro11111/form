import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {ForbiddenValidatorDirective} from './forbidden-name.validator';
import {ValidatePeselDirective} from './pesel-validator.directive';
import { ValidateEmailDirective } from './email.validator.directive';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ForbiddenValidatorDirective,
    ValidatePeselDirective,
    ValidateEmailDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
