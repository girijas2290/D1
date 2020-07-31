export interface Invoice{

    id: number;
    name:string;
    email:string;
    address:string;
    contactnumber:number;
    invoiceIssuedate:Date,
    paymentDuedate:Date,
    DeliveryDuedate:Date,
    invoicerefnumber:string;
    totalamount:number;
}