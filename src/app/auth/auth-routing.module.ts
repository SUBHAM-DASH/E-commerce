import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLoginComponent } from './seller-login/seller-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SellerLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
