import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {ICustomer} from "../shared/interfaces";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  customers: ICustomer[];
  totalRecords = 0;
  pageSize = 5;

  constructor(private dataService: DataService) {

  }
  ngOnInit() {
    this.getCustomersPage(1);
  }

  getCustomersPage(page:number) {
    this.dataService.getCustomersPage()
  }
}
