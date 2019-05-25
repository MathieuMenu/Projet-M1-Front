/// <reference types="@types/googlemaps" />
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { MongoService } from './../service/mongo.service';

import { HttpModule } from '@angular/http'

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { environment } from '../../environments/environment';
import { MapsAPILoader } from '@agm/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
        apiKey: environment.key,
        libraries: ["places"],
        }),
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      declarations: [
        HomeComponent,
      ],
      providers: [
        AuthService,
        MongoService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should ...', inject([MongoService], (servicemongo: MongoService) => {
    expect(servicemongo).toBeTruthy();
  }));
  
});
