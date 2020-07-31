const catchasync=require('./catchasync');
const Apperror=require('./apperror');
const Invoice=require('../models/invoiceModel');
const factory=require('./handlerfactory');

exports.getallinvoices=catchasync(async(req,res,next)=>{
    
    const invoices=await Invoice.find();

    res.status(200).json({
        status:'success',
        noofreview:invoices.length,
        data:
        {
            invoices
        }
    });
});

exports.getinvoicebyid=catchasync(async(req,res,next)=>
{
    
    const invoice=await Invoice.findById(req.params.id);

    if(!invoice)
    {
        return next(new Apperror('No invoice find with this id',404));
    }
    res.status(200).json({
        status:'success',
        data:
        {
           invoice
        }
    });
    
});


exports.createinvoice=factory.createOne(Invoice);

exports.updateinvoice=factory.updateOne(Invoice);
exports.deleteinvoice=factory.deleteOne(Invoice);