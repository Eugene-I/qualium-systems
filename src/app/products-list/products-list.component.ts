import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../shared/access.class';
import { ROLES } from '../shared/assess.data';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {
	roles: Role[];
	products: Product[] = [];
	
	constructor(public svc: ProductService, private router: Router) { }
	
	ngOnInit(): void {
		this.svc.getProductsList();
		this.roles = ROLES;
	}
	
	onSelect(selected: Product): void {
		this.router.navigate(['edit-product', selected.id]);
	}
}