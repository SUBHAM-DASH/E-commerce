import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    SellerLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
