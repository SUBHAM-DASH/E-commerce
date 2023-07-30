import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  productForm!: FormGroup;
  formSubmitted: boolean = false;

  size: any = new FormControl('', [Validators.required]);

  sizeList: string[] = [
    'Extra Small',
    'Small',
    'Midium',
    'Large',
    'Extra Large',
    '2 Extra Large',
  ];
  constructor(private fb: FormBuilder, private toster: ToastrService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productTitle: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDesc: ['', Validators.required],
    });
  }

  public addProductSubmit() {
    if (this.productForm.invalid) {
      this.formSubmitted = true;
      this.toster.error('Sorry. Product Filed Is Invalid.');
      return;
    }

  }
}
