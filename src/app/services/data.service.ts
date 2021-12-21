import {Injectable} from "@angular/core";
import {UtilsService} from "./utils.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IApiResponse, ICustomer, IPagedResults} from "../shared/interfaces";
import {catchError, map} from "rxjs/operators";


@Injectable()
export class DataService {

  baseUrl = this.utilsService.getApiUrl();

  CUSTOMERS_PAGE = this.baseUrl + '/customers/page';
  CUSTOMERS = this.baseUrl + '/customers';

  constructor(private utilsService: UtilsService, private http: HttpClient) {
  }

  getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
    return this.http.get(`${(this.CUSTOMERS_PAGE)}/${page}/${pageSize}`,
      {observe: 'response'})
      .pipe(
        map(res => {
          const customers = res.body as ICustomer[];
          const totalRecords = customers.length;
          this.calculateCustomersOrderTotal(customers);
          return {
            results: customers,
            totalRecords
          };
        }),
        catchError(this.handleError)
      );
  }

  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get(`${this.CUSTOMERS}/${id}`,
      {observe: 'response'}).pipe(
      map(res => {
        const customer = res.body as ICustomer;
        return customer;
      }),
      catchError(this.handleError)
    );
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get(`${this.CUSTOMERS}`,
      {observe: 'response'})
      .pipe(
        map(res => {
          const customer = res.body as ICustomer[];
          return customer;
        }),
        catchError(this.handleError)
      );
  }

  insertCustomer(customer: ICustomer): Observable<boolean> {
    return this.http.post<IApiResponse>(this.CUSTOMERS, customer)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }

  updateCustomer(customer: ICustomer): Observable<boolean> {
    return this.http.post<IApiResponse>(this.CUSTOMERS, customer)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<IApiResponse>(`${this.CUSTOMERS}/${id}`)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }

  calculateCustomersOrderTotal(customers: ICustomer[]) {
    customers.forEach(customer => {
      const total = customer.orders.map((order) => {
        return order.itemCost;
      })
        .reduce((t, order) =>
          t + order
        );
      customer.orderTotal = total;
    });
  }

}
