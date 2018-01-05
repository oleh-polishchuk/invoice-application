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

}
