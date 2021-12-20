import {Inject, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UtilsService {

  public static const CUSTOMERS_PAGE = '/customers/page';
  public static const CUSTOMERS = '/customers';
  public static const ORDERS = '/orders';

  constructor(@Inject('Window') private window: Window) {
  }

  getApiUrl() {
    const port = '8080';
    return `${this.window.location.protocol}//${this.window.location.hostname}${port}`;
  }
}
