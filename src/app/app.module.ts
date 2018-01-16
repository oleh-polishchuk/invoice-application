import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material */
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSortModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceService } from './services/invoice.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './services/customer.service';
import { CustomersComponent } from './customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { ProductsComponent } from './products/products.component';
import { ProductSnackComponent } from './product-snack/product-snack.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SimpleTableService } from './services/simple-table.service';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { InvoiceItemService } from './services/invoice-item.service';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatMenuModule
  ],
  declarations: [
    AppComponent,
    InvoicesComponent,
    InvoiceComponent,
    CustomerComponent,
    CustomersComponent,
    ProductComponent,
    ProductsComponent,
    ProductSnackComponent,
    ProductTableComponent,
    InvoiceTableComponent,
    InvoiceItemComponent,
    ShowErrorsComponent
  ],
  entryComponents: [ ProductSnackComponent ],
  providers: [ InvoiceService, CustomerService, ProductService, SimpleTableService, InvoiceItemService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
