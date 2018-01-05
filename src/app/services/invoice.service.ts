import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Invoice } from "../invoice/invoice";
import { catchError, tap } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable()
export class InvoiceService extends HttpService {

  private invoicesUrl = 'api/invoices';  // URL to web api

  constructor(private http: HttpClient) {
    super();
  }

  /** GET invoices from the server */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl)
      .pipe(
        tap(invoices => this.log(`fetched invoices`)),
        catchError(this.handleError('getInvoices', []))
      );
  }

  /** GET invoice by id. Will 404 if id not found */
  getInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.get<Invoice>(url).pipe(
      tap(_ => this.log(`fetched invoice id=${id}`)),
      catchError(this.handleError<Invoice>(`getInvoice id=${id}`))
    );
  }

  /** POST invoice. Will 404 if id not found */
  saveInvoice(invoice: Invoice) {
    return this.http.post<Invoice>(this.invoicesUrl, invoice, this.httpOptions).pipe(
      tap(_ => this.log(`save invoice`)),
      catchError(this.handleError<Invoice>(`saveInvoice`))
    );
  }

  /** PUT invoice by id. Will 404 if id not found */
  updateInvoice(invoice: Invoice) {
    const url = `${this.invoicesUrl}/${invoice.id}`;
    return this.http.put<Invoice>(url, invoice, this.httpOptions).pipe(
      tap(_ => this.log(`updated invoice id=${invoice.id}`)),
      catchError(this.handleError<Invoice>(`updateInvoice id=${invoice.id}`))
    );
  }

  /** DELETE invoice by id. Will 404 if id not found */
  deleteInvoice(id: number) {
    if (!id) {
      throw `Cannot delete invoice with id: ${id}`;
    }

    const url = `${this.invoicesUrl}/${id}`;
    return this.http.delete<Invoice>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted invoice id=${id}`)),
      catchError(this.handleError<Invoice>(`deleteInvoice id=${id}`))
    );
  }

}
