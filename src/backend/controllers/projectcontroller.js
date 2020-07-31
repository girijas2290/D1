const catchasync=require('./catchasync');
const Apperror=require('./apperror');
const Project=require('../models/Projectdetail');
const factory=require('./handlerfactory');

exports.getallprojects=catchasync(async(req,res,next)=>{
    
   
    const projects=await Project.find();

    res.status(200).json({
        status:'success',
        noofproject:projects.length,
        data:
        {
            projects
        }
    });
});

exports.getprojectbyid=catchasync(async(req,res,next)=>
{
    
    const project=await Project.findById(req.params.id);

    if(!project)
    {
        return next(new Apperror('No project find with this id',404));
    }
    res.status(200).json({
        status:'success',
        data:
        {
           project
        }
    });
    
});


exports.createproject=factory.createOne(Project);

exports.updateproject=factory.updateOne(Project);
exports.deleteproject=factory.deleteOne(Project);