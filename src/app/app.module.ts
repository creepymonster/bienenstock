import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppComponent } from '@app/app.component';
import { AutoRefreshComponent, WeightViewComponent } from '@app/components';
import { getEnv, ENV } from '@app/providers/environment.provider';

@NgModule({
  declarations: [
    AppComponent,
    AutoRefreshComponent,
    WeightViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [
    { provide: ENV, useFactory: getEnv }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
