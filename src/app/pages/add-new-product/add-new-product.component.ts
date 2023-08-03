import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { AddSellerProduct } from 'src/app/stores/action/product.action';

interface Files {
  name: string;
  file: string;
  fileSource: string[];
}

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  productForm!: FormGroup;
  formSubmitted: boolean = false;

  size: any = new FormControl('', [Validators.required]);
  color: any = new FormControl('', [Validators.required]);

  imageFiles: File[] = [];

  sizeList: string[] = [
    'Extra Small',
    'Small',
    'Midium',
    'Large',
    'Extra Large',
    '2 Extra Large',
  ];

  colorList: string[] = [
    'blue',
    'white',
    'black',
    'navy blue',
    'gray',
    'purple',
  ];

  constructor(
    private fb: FormBuilder,
    private toster: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productTitle: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDesc: ['', Validators.required],
    });
  }

  public getProductImages(file: File): void {
    this.imageFiles.push(file);
  }

  public addProductSubmit() {
    if (this.productForm.invalid) {
      this.formSubmitted = true;
      this.toster.error('Sorry. Product Filed Is Invalid.');
      return;
    } else if (this.imageFiles?.length == 0) {
      this.formSubmitted = true;
      this.toster.error('Sorry. Product Images Are Empty.');
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < this.imageFiles.length; i++) {
      fd.append('image', this.imageFiles[i]);
    }
    for (const key in this.productForm.value) {
      fd.append(key, this.productForm.value[key]);
    }
    fd.append('productSize', JSON.stringify(this.size.value));
    fd.append('productColor', JSON.stringify(this.color.value));
    this.store.dispatch(new AddSellerProduct(fd));
  }
}
