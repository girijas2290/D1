const{promisify}=require('util');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const User=require('./../models/usersModel');
const catchasync=require('../controllers/catchasync');
const Apperror = require('../controllers/apperror');


const signtoken=id=>
{
    return jwt.sign({id},process.env.SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES_IN});
}


const createsendtoken=(user,statuscode,res)=>
{
    const token=signtoken(user._id);
    const cookieoptions={
        expires:new Date(Date.now()+process.env.JWT_EXPIRES_IN*24*60*60*1000),
        
        httpOnly:true
    };
    if(process.env.NODE_ENV==='production')
    cookieoptions.secure=true;
    res.cookie('jwt',token,cookieoptions);

    //remove password from signup user
    user.password=undefined;
    res.status(statuscode).json({
        status:'success',
        token,
        data:
        {
         user
        }
    });

};


exports.signup=catchasync(async(req,res,next)=>
{
    const newuser=await User.create(req.body);
    createsendtoken(newuser,201,res);
});


exports.login=catchasync(async(req,res,next)=>
{

    const {email,password}=req.body;

    //if email and password exist
    if(!email || !password)
    {
        return next(new Apperror('please provide  password and  email',400));
    }    

    //check if user exists
    const newuser=await User.findOne({email}).select('+password');
    
    if(!newuser || !(await newuser.correctpassword(password,newuser.password)))
    {
        return next(new Apperror('incorrect email or password',401));
    }
    createsendtoken(newuser,200,res);
});

exports.logout=(req,res)=>{
    res.cookie('jwt','loggedout',{
        expires:new Date(Date.now()+process.env.JWT_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    })
    res.status(200).json({
        status:'success'
    });
}

