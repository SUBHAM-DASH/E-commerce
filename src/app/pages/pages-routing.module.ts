import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartCardComponent } from './cart-card/cart-card.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MySalesComponent } from './my-sales/my-sales.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'cart', component: CartCardComponent },
  { path: 'add-newproduct', component: AddNewProductComponent },
  { path: 'my-sales', component: MySalesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
