import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-product-new',
	templateUrl: './product-new.component.html',
	styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {

	submitted: boolean;
	showSuccessMessage: boolean;

	key: AbstractControl;
	imageLink: AbstractControl;
	title: AbstractControl;
	link: AbstractControl;
	feedback: AbstractControl;

	constructor(public svc: ProductService, private router: Router) { }

	ngOnInit(): void {
		this.createControls();
	}

	createControls(): void {
		this.title = this.svc.form.controls.title;
		this.feedback = this.svc.form.controls.feedback;
		this.imageLink = this.svc.form.controls.imageLink;
		this.imageLink.setValue('');
		this.title.setValue('');
		this.feedback.setValue('');
	}

	onSubmit(): void {
		this.submitted = true;
		
		if (this.svc.form.valid)
			if (this.svc.form.controls.key.value === null) {
				this.svc.addProduct(this.svc.form.value).subscribe(res => {
					this.router.navigate(['products-list']);
				}, err => console.log(err));
			}
	}
}
