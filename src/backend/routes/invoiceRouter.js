const express=require('express');
const invoicecontroller=require('../controllers/invoicecontroller');
const invoicerouter=express.Router();


invoicerouter.route('/').get(invoicecontroller.getallinvoices).
        post(invoicecontroller.createinvoice);    
invoicerouter.route('/:id').get(invoicecontroller.getinvoicebyid).patch(invoicecontroller.updateinvoice)
                .delete(invoicecontroller.deleteinvoice);

module.exports=invoicerouter;        