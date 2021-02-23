import { CreditDebitIndicatorType } from "../enum/creditDebitIndicator.enum";
import { CurrencyCode } from "../enum/currency.enum";
import { SalaryType } from "../enum/salary.enum";

export interface ITransactionModel {
  categoryCode: string;
  dates: ITransactionDates;
  transaction: ITransaction;
  merchant: IMerchant;
}

export interface ITransactionDates {
  valueDate: any;
}

export interface ITransaction {
  amountCurrency: IAmountCurrency;
  type: string;
  creditDebitIndicator?: string;
}

export interface IAmountCurrency {
  amount: number;
  currencyCode: string;
}

export interface IMerchant {
  name: string;
  accountNumber: string;
}
