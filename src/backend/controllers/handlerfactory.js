const catchasync=require('./catchasync');
const Apperror=require('./apperror');

exports.deleteOne=Model=>catchasync(async (req,res,next)=>{

    const doc=await Model.findByIdAndDelete(req.params.id);
    
    if(!doc)
    {
        return next(new Apperror('please provide  password and  email',400));
    }    
    
    res.status(204).json({
        status:'success',
        data:null
        });

});  

exports.updateOne=Model=>catchasync(async (req,res,next)=>{
    const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    
    if(!doc)
    {
        return next(new Apperror('No document  found with id',404));
    }    
    
    res.status(200).json({
        status:'success',
        data:{
            doc
        }
        });

});  

exports.createOne=Model=>catchasync(async(req,res,next)=>
{
    const doc=await Model.create(req.body);
    {
        //201 create new tour
        res.status(201).json({
            status:'success',
            data:{
                doc
            }
        });
    }
    
   
});
