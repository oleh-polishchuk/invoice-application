import { Component, OnInit } from '@angular/core';
import { Invoice } from "../invoice/invoice";
import { InvoiceService } from "../services/invoice.service";
import { CustomerService } from "../services/customer.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import { Router } from "@angular/router";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: [ './invoices.component.css' ]
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[];

  constructor(private router: Router,
              private invoiceService: InvoiceService,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    const response = Observable.forkJoin(
      this.invoiceService.getInvoices(),
      this.customerService.getCustomers()
    );

    response.subscribe(res => {
      this.invoices = res[ 0 ];
      this.invoices.forEach(invoice => {
        invoice.customer = res[ 1 ].find(customer => +customer.id === +invoice.id);
      });
    });
  }

  updateInvoices(invoices: Invoice[]) {
    this.invoices = invoices;
  }

  removeInvoice(invoice: Invoice) {
    this.invoiceService.deleteInvoice(invoice.id)
      .subscribe(_ => this.getInvoices());
  }

  editInvoice(invoice: Invoice) {
    this.router.navigate([`/invoices/${invoice.id}`]);
  }

}
