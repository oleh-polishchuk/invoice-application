import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../customer/customer';
import { HttpService } from "./http.service";

@Injectable()
export class CustomerService extends HttpService {

  private customersUrl = 'api/customers';  // URL to web api

  constructor(private http: HttpClient) {
    super();
  }

  /** GET customers from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        tap(customers => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }

  /** GET customer by id. Will 404 if id not found */
  getCustomer(id) {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  /** POST customer. Will 404 if id not found */
  saveCustomer(customer: Customer) {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
      tap(_ => this.log(`save customer name=${customer.name}`)),
      catchError(this.handleError<Customer>(`saveCustomer name=${customer.name}`))
    );
  }

  /** PUT customer by id. Will 404 if id not found */
  updateCustomer(customer: Customer) {
    const url = `${this.customersUrl}/${customer.id}`;
    return this.http.put<Customer>(url, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<Customer>(`updateCustomer id=${customer.id}`))
    );
  }

  /** DELETE customer by id. Will 404 if id not found */
  deleteCustomer(id: number) {
    if (!id) {
      throw `Cannot delete customer with id: ${id}`;
    }

    const url = `${this.customersUrl}/${id}`;
    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>(`deleteCustomer id=${id}`))
    );
  }

}
