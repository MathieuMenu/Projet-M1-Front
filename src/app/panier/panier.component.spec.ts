/// <reference types="@types/googlemaps" />
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AuthService } from './../auth/auth.service';
import { MongoService } from './../service/mongo.service';

import { HttpModule } from '@angular/http'

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../../environments/environment';
import { MapsAPILoader } from '@agm/core';
import { PanierComponent } from './panier.component';

describe('PanierComponent', () => {

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
        PanierComponent,
      ],
      providers: [
        AuthService,
        MongoService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(PanierComponent);
    const component = fixture.componentInstance;
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PanierComponent);
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
