import { Location } from "@angular/common";
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { Invoice } from "../invoice/invoice";
import { SimpleTableConfig } from "../entities/simple-table-config";
import { InvoiceService } from "../services/invoice.service";

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: [ './invoice-table.component.css' ]
})
export class InvoiceTableComponent implements OnInit, DoCheck {

  displayedColumns = [ 'customer', 'discount', 'totalAmount', 'createdAt', 'action' ];
  invoiceDataSource = new MatTableDataSource();

  constructor(public location: Location,
              private invoiceService: InvoiceService) {}

  @Input()
  items: Invoice[];

  @Input()
  config: SimpleTableConfig;

  @Output()
  itemsChange: EventEmitter<Invoice[]> = new EventEmitter<Invoice[]>();

  @Output()
  onEdit: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  @Output()
  onRemove: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  ngOnInit(): void {
    this.invoiceDataSource.data = this.items;
  }

  ngDoCheck(): void {
    this.invoiceDataSource.data = this.items;
  }

  removeItem(invoice: Invoice) {
    this.onRemove.emit(invoice);
  }

  editItem(invoice: Invoice) {
    this.onEdit.emit(invoice);
  }

  isEmptyTable() {
    return !this.items || this.items.length === 0;
  }

}
