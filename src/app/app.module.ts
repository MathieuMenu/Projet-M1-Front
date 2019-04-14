/// <reference types="@types/googlemaps" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { HomeComponent } from './home/home.component';

import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CallbackComponent
  ],
  imports: [
  	AgmCoreModule.forRoot({
      apiKey: environment.key,
      libraries: ["places"],
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
