import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "./../services/transactions.service";
import { MerchantsType } from "../enum/merchants.enum";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactions = [];
  merchantName = MerchantsType;
  sortOrder = "";
  sortBy = "";

  constructor(public transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.latestTransactions.subscribe((response) => {
      this.transactions = response || [];
    });

    this.transactionsService.getTransactions();
  }

  sortType(sort) {
    if (this.sortBy === sort) {
      this.sortOrder = "desc";
    } else {
      this.sortOrder = "asc";
    }

    if (sort === "date") {
      this.sort(this.sortByDate);
    }

    if (sort === "merchant") {
      this.sort(this.sortByName);
    }

    if (sort === "amount") {
      this.sort(this.sortByAmount);
    }

    this.sortBy = sort;
  }

  sort(type) {
    if (this.sortOrder === "asc") {
      this.transactions = this.transactions.sort(type);
    } else {
      this.transactions = this.transactions.reverse();
    }
  }

  sortByDate(n1, n2) {
    return new Date(n1.dates).getTime() > new Date(n2.dates).getTime();
  }

  sortByName(n1, n2) {
    let a = n1.merchant.name;
    let b = n2.merchant.name;
    if (a.toLowerCase() !== b.toLowerCase()) {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    return a > b ? 1 : a < b ? -1 : 0;
  }

  sortByAmount(n1, n2) {
    return (
      parseInt(n1.transaction.amountCurrency["amount"]) -
      parseInt(n2.transaction.amountCurrency["amount"])
    );
  }
}
