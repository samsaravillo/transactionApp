import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "./../services/transactions.service";
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-transfer-form",
  templateUrl: "./transfer-form.component.html",
  styleUrls: ["./transfer-form.component.scss"],
})
export class TransferFormComponent implements OnInit {
  @ViewChild("form", { static: false }) form: NgForm;
  accountAmount = 5824.76;
  transactions = [];

  get canSubmit() {
    if (!this.form || !this.form.value) return false;

    return this.form.value.amount > 0 && this.form.value.amount <= 500;
  }

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.latestTransactions.subscribe((response) => {
      this.transactions = response || [];
    });
  }

  onSubmit(form: NgForm) {
    let transaction = {
      categoryCode: "#123456",
      dates: {
        valueDate: new Date(),
      },
      transaction: {
        amountCurrency: {
          amount: form.value.amount,
          currecyCode: "SGD",
        },
        type: "Salaries",
        creditDebitIndicator: "CRDT",
      },
      merchant: {
        name: form.value.toAccount,
        accountNumber: "SI64397745065188826",
      },
    };

    this.transactions.unshift(transaction);
    this.accountAmount = this.accountAmount - form.value.amount;
    this.form.controls["amount"].setValue("");
    this.form.controls["toAccount"].setValue("");
  }
}
