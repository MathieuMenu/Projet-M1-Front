/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { CallbackComponent } from '../callback/callback.component';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [RouterTestingModule],
      providers: [AuthService],
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should ...', inject([Router], (route: Router) => {
    expect(route).toBeTruthy();
  }));

});
