import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { OperatorService } from './operator/operator.service';

const appRoutes: Routes = [
  { path: 'operator', component: OperatorComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
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
