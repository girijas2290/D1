const catchasync=require('./catchasync');
const Apperror=require('./apperror');
const Issue=require('../models/IssueModel');
const factory=require('./handlerfactory');

exports.getallissues=catchasync(async(req,res,next)=>{
    
    const issues=await Issue.find();

    res.status(200).json({
        status:'success',
        noofissue:issues.length,
        data:
        {
            issues
        }
    });
});

exports.getissuebyid=catchasync(async(req,res,next)=>
{
    
    const issue=await Issue.findById(req.params.id);

    if(!issue)
    {
        return next(new Apperror('No issue find with this id',404));
    }
    res.status(200).json({
        status:'success',
       
        data:
        {
           issue
        }
    });
    
});


exports.createissue=factory.createOne(Issue);

exports.updateissue=factory.updateOne(Issue);
exports.deleteissue=factory.deleteOne(Issue);