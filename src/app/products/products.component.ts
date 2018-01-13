import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource } from "@angular/material";
import { ProductModalComponent } from "../product-modal/product-modal.component";
import { ProductSnackComponent } from "../product-snack/product-snack.component";
import { ProductSnack } from "../product-snack/product-snack";
import { SimpleTableService } from "../services/simple-table.service";
import { SimpleTableConfig } from "../entities/simple-table-config";

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

  productTableConfig: SimpleTableConfig;

  constructor(private productService: ProductService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private simpleTableService: SimpleTableService) { }

  ngOnInit() {
    // this.simpleTableService.initConfig({edit: true});
    // this.productTableConfig = this.simpleTableService.getConfig();
    this.getProducts();
  }

  /**
   * Get products
   */
  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Add product
   */
  addProduct() {
    this.openCreateProductDialog();
  }

  /**
   * Open create new product modal window
   */
  openCreateProductDialog(): void {
    let dialogRef = this.dialog.open(ProductModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.product = result;
      if (this.product && this.product.isValid()) {
        console.log('The dialog was closed with result:', result);

        this.productService.saveProduct(this.product)
          .subscribe(product => {
            this.product = product;
            this.getProducts();
            this.showUndoNotification('Product created');
          });
      }
    });
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

}
