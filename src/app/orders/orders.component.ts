import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {ICustomer, IPagedResults} from "../shared/interfaces";

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

  getCustomersPage(pPage: number) {
    const page = (pPage - 1) + this.pageSize;
    this.dataService.getCustomersPage(page, this.pageSize)
      .subscribe((response: IPagedResults<ICustomer[]>) => {
        this.totalRecords = response.totalRecords;
        this.customers = response.results;
      });
  }
}
