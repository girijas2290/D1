const catchasync=require('./catchasync');
const Apperror=require('./apperror');
const User=require('../models/usersModel');
const factory=require('./handlerfactory');

exports.getalluser=catchasync(async(req,res,next)=>{
    
    const users=await User.find();

    res.status(200).json({
        status:'success',
        noofuser:users.length,
        data:
        {
            users
        }
    });
});

exports.getuserbyid=catchasync(async(req,res,next)=>
{
    
    const user=await User.findById(req.params.id);

    if(!user)
    {
        return next(new Apperror('No tour find with this id',404));
    }
    res.status(200).json({
        status:'success',
        
        data:
        {
           user
        }
    });
    
});


exports.createuser=factory.createOne(User);

exports.updateuser=factory.updateOne(User);
exports.deleteuser=factory.deleteOne(User);