const mongoose=require('mongoose');
const validator=require('validator');

const  invoiceschema=new mongoose.Schema({
    name:
    {
        type:String,
        required:[true,'please tell your name'],
        unique:true
    },
    email:
    {
        type:String,
        required:[true,'please provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    address:
    {
        type:String,
        required:[true,'please provide address of invoice user']
    },
    contactnumber:
    {
        type:Number,
        unique:true,
        maxlength:10,
        required:[true,'A invoice must have contact number']
    },
    invoiceIssuedate:Date,
    paymentDuedate:Date,
    DeliveryDuedate:Date,
    invoicerefnumber:
    {
        type:String,
        unique:true,
        required:[true,'A invoice have a reference number']
    },
    totalamount:
    {
        type:Number,
        required:[true,'A invoice must have an amount']
    }

        
});
const Invoice=mongoose.model('Invoice',invoiceschema);
module.exports=Invoice;