import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Product } from "../product/product";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: [ './product-modal.component.css' ]
})
export class ProductModalComponent implements OnInit {

  private productForm: FormGroup;
  product: Product = new Product();

  constructor(public dialogRef: MatDialogRef<ProductModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl()
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(productForm: NgForm): void {
    if (productForm.dirty && productForm.valid) {
      this.dialogRef.close(productForm.value);
    }
  }

}
