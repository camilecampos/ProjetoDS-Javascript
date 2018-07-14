import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorService } from './operator/operator.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    OperatorComponent
  ],
  providers: [
    OperatorService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
