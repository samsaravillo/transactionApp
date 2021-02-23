import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import mockData from "../../assets/mock/transactions.json";
import { ITransactionModel } from "./../interfaces/transaction.inteface";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  data = [];

  private transactionsSub = new BehaviorSubject<ITransactionModel[]>(null);
  latestTransactions = this.transactionsSub.asObservable();

  constructor(private http: HttpClient) {}

  getTransactions() {
    const response: ITransactionModel[] = mockData.data;
    this.transactionsSub.next(response);
  }

  changeTransactionSub(newData) {
    this.transactionsSub.next(newData);
  }
}
