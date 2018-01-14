import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';
import { MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource } from "@angular/material";
import { ProductSnackComponent } from "../product-snack/product-snack.component";
import { ProductSnack } from "../product-snack/product-snack";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {

  product: Product;
  products: Product[];
  productSnack = new ProductSnack();


  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [ 'id', 'name', 'price', 'actions' ];
  dataSource;

  constructor(private productService: ProductService,
              public snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  /**
   * Get products
   */
  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = this.orderBy(products, 'id', 'desc');
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Add product
   */
  addProduct() {
    this.router.navigate([ '/products/add' ]);
  }

  /**
   * Show notification with Undo action
   *
   * @param message
   */
  showUndoNotification(message: string) {
    this.productSnack = this.getUndoProductSnack(message);
    this.snackBar.openFromComponent(ProductSnackComponent, {
      duration: 60000,
      data: { productSnack: this.productSnack }
    } as MatSnackBarConfig);
  }

  /**
   * Method return instance of product notification (snack) for undo action
   *
   * @param message
   * @returns {ProductSnack}
   */
  private getUndoProductSnack(message: string) {
    return {
      message: message,
      button: {
        caption: 'Undo',
        action: () => {
          this.undo(this.product);
        }
      }
    } as ProductSnack;
  }

  /**
   * Undo action
   */
  undo(product: Product): void {
    this.productService.deleteProduct(product.id)
      .subscribe(_ => this.getProducts());
  }

  orderBy(products: Product[], fieldName: string, order: string): Product[] {
    return products.sort((a: Product, b: Product) => {
      if (order === 'asc') {
        return a[ fieldName ] - b[ fieldName ];
      } else {
        return b[ fieldName ] - a[ fieldName ];
      }
    });
  }

}
