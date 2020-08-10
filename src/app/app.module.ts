import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { getEnv, ENV } from '@app/providers/environment.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: ENV, useFactory: getEnv }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
