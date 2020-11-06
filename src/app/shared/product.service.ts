import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product';

const url = 'https://products-20201104.firebaseio.com/products';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	products: Product[] = [];

	constructor(public http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

	form = this.formBuilder.group({
		key: [null],
		imageLink: ['', Validators.required],
		title: ['', Validators.required],
		feedback: ['', Validators.required],
	});

	getProductsList(): Product[] {
		this.products = [];
		
		this.http.get<Product[]>(`${url}.json`, httpOptions).subscribe(res => {
			Object.keys(res).forEach(key => {
				const obj = Object.assign({}, res[key]);
				obj.id = key;

				this.products.push(obj);
			});
		});

		return this.products;
	}

	getProduct(id: string): Product {
		id = id.toString();
		return this.products.find(product => product.id === id);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(`${url}.json`, product, httpOptions);
	}

	deleteProduct(product: Product): Observable<void> {
		return this.http.delete<void>(`${url}/${product.id}.json`, httpOptions);
	}

	updatePorduct(key: string, product: Product): void {
		this.http.put<Product>(`${url}/${key}.json`, product, httpOptions);
	}

	trimID(product: Product): Product {
		return Object.assign({}, {
			title: product.title,
			imageLink: product.imageLink,
			feedback: product.feedback
		})
	}

	resetTempProduct(product: Product): void {
		product = {
			id: null,
			title: null,
			imageLink: null,
			feedback: null
		}
	}
}
