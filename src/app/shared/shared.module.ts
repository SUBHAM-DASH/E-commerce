import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './components/card-product/card-product.component';
import { MultipleImageUploadComponent } from './components/multiple-image-upload/multiple-image-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [CardProductComponent, MultipleImageUploadComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CardProductComponent, MultipleImageUploadComponent],
})
export class SharedModule {}
