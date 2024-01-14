import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoansComponent } from './components/loans/loans.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  // Login   : LoginComponen
  { path: '', component: LoansComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Loans/:id', component: LoansComponent },
  { path: 'Profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
