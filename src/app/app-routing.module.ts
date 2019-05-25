import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'panier', component: PanierComponent },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
