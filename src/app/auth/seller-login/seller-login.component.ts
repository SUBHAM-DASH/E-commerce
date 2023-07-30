import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss'],
})
export class SellerLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authServ: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators?.required, Validators.email]],
      password: ['', Validators?.required],
    });
  }

  public onClickLogin() {
    this._authServ.loginEcommerceUser(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.status == 'success') {
          localStorage.setItem('e-commerce-token', response.token);
          this.loginForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/pages']);
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
