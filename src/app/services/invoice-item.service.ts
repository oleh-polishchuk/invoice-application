import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { InvoiceItem } from "../invoice-item/invoice-item";
import { catchError, tap } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable()
export class InvoiceItemService extends HttpService {

  private invoicesUrl = 'api/invoices';  // URL to web api

  constructor(private http: HttpClient) {
    super();
  }

  /** GET invoice items from the server */
  getInvoiceItems(id: number): Observable<InvoiceItem[]> {
    const url = `${this.invoicesUrl}/${id}/items`;
    return this.http.get<InvoiceItem[]>(url)
      .pipe(
        tap(invoices => this.log(`fetched invoice items`)),
        catchError(this.handleError('getInvoiceItems', []))
      );
  }

  /** GET invoice item by id. Will 404 if id not found */
  getInvoiceItem(invoiceId: number, itemId: number): Observable<InvoiceItem> {
    const url = `${this.invoicesUrl}/${invoiceId}/items/${itemId}`;
    return this.http.get<InvoiceItem>(url).pipe(
      tap(_ => this.log(`fetched invoice item with id=${itemId}`)),
      catchError(this.handleError<InvoiceItem>(`getInvoiceItem id=${itemId}`))
    );
  }

  /** POST invoice item. Will 404 if id not found */
  saveInvoiceItem(invoiceItem: InvoiceItem) {
    const url = `${this.invoicesUrl}/${invoiceItem.invoice_id}/items`;
    return this.http.post<InvoiceItem>(url, invoiceItem, this.httpOptions).pipe(
      tap(_ => this.log(`save invoice item`)),
      catchError(this.handleError<InvoiceItem>(`saveInvoiceItem`))
    );
  }

}
