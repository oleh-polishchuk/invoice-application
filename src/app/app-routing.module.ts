import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { InvoiceComponent } from "./invoice/invoice.component";
import { InvoicesComponent } from "./invoices/invoices.component";

const routes: Routes = [
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/add', component: ProductComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoices/:id', component: InvoiceComponent },
  { path: 'invoices/create', component: InvoiceComponent },
  { path: '**', redirectTo: '/invoices' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
