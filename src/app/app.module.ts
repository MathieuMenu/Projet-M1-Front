/// <reference types="@types/googlemaps" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Service } from './app.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Service
  ],
  imports: [
  	AgmCoreModule.forRoot({
      apiKey: token,
      libraries: ["places"]
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

   constructor(private Service: Service) {}

      this.Service
        .getEnv().subscribe(res => {
          this.token = res; 
    })
}
