import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { CartCardComponent } from './cart-card/cart-card.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent, CartCardComponent, AddNewProductComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
