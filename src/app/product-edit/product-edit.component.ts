import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private editProduct: Product = {
    id: null,
    title: null,
    imageLink: null,
    feedback: null
  };
  
  public product: Product;
  
  constructor(private svc: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.product = this.svc.getProduct(params.id);
    });
  }

  setValues(id, value): void {
    if (this.editProduct[id] !== undefined) {
      this.editProduct[id] = value;
    }
  }

  updateProduct(product: Product): void {
    Object.keys(this.editProduct).forEach(key => {
      if (this.editProduct[key]) {
        product[key] = this.editProduct[key]
      }
    });
    this.svc.updatePorduct(product.id, this.svc.trimID(product));
    this.svc.resetTempProduct(this.editProduct);
  }

  deleteProduct(product): void {
    this.svc.deleteProduct(product).subscribe(() => {
      this.svc.products.splice(this.svc.products.indexOf(product), 1);
      this.router.navigate(['products-list']);
    });
  }
}
