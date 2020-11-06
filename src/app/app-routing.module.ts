import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'products-list', pathMatch: 'full'},
  {path: 'products-list', component: ProductsListComponent},
  {path: 'add-new-product', component: ProductNewComponent},
  {path: 'edit-product/:id', component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
