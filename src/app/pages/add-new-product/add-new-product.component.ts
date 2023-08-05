import { MultipleImageUploadComponent } from './../../shared/components/multiple-image-upload/multiple-image-upload.component';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { environment } from 'environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, filter } from 'rxjs';
import {
  AddSellerProduct,
  EditSellerProduct,
} from 'src/app/stores/action/product.action';
import { ProductState } from 'src/app/stores/state/product.state';

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
export class AddNewProductComponent implements OnInit, OnDestroy {
  @ViewChild(MultipleImageUploadComponent)
  childComp!: MultipleImageUploadComponent;

  serverUrl: string = environment.serverUrl;
  isProductEdit: boolean = false;
  editData!: any;

  @Select(ProductState.afterAddProductResp)
  responseMessage$!: Observable<boolean>;
  responseDataSubscription!: Subscription;

  productForm!: FormGroup;
  formSubmitted: boolean = false;

  size: any = new FormControl('', [Validators.required]);
  color: any = new FormControl('', [Validators.required]);

  imageFiles: File[] = [];
  editImages: string[] = [];

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
    private store: Store,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.responseDataSubscription = this.responseMessage$.subscribe(
      (response: any) => {
        if (response) {
          this.toster.success(response);
        }
      }
    );

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productTitle: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDesc: ['', Validators.required],
    });

    //Product Edit
    this.router?.queryParams?.subscribe((params: any) => {
      if (params && params._id) {
        this.isProductEdit = true;
        this.editData = params;
        this.productForm.patchValue({
          productName: params?.productname,
          productTitle: params?.producttitle,
          productPrice: params?.price,
          productDesc: params?.description,
        });
        this.size.setValue(params?.size);
        this.color.setValue(params?.color);
        this.editImages = params?.images;
      }
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
    } else if (this.imageFiles?.length == 0 && this.editImages?.length == 0) {
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

    if (!this.isProductEdit) {
      this.store.dispatch(new AddSellerProduct(fd));
      this.productForm.reset();
      this.size.setValue('');
      this.color.setValue('');
      this.childComp.images = [];
      this.childComp.totalFiles = [];
      this.childComp.myForm.reset();
    } else {
      fd.append('_id', this.editData._id);
      fd.append('imagesfiles',JSON.stringify(this.editImages));
      this.store.dispatch(new EditSellerProduct(fd));
    }
  }

  ngOnDestroy() {
    this.responseDataSubscription.unsubscribe();
  }
}
