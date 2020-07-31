const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const  userschema=new mongoose.Schema({
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

    password:
    {
        type:String,
        required:[true,'please provide a  password'],
        maxlength:10
    },
    passwordconfirm:
    {
        type:String,
        required:[true,'please provide a confirm password'],
        maxlength:10,
        validate:{
            //this works on save and create
            validator:function(el)
            {
                return el===this.password;
            },
            message:'passwords are not the same'
        }
    },
    
    photo:
    {
        type:String,
        //required:[true,'please provide a photo'],       
    },
    address:
    {
        type:String,
        required:[true,'please provide address of user']
    },
    country:
    {
        type:String,
        required:[true,'A user must have country']
    }
        
});

userschema.pre('save',async function(next)
{
    //this runs if password is actually modified
    if(!this.isModified('password')) return next();

    //hash the password with cost of 12
    this.password=await bcrypt.hash(this.password,12);

    //delete the password confirm field
    this.passwordconfirm=undefined;

    next();
})



const Users=mongoose.model('User',userschema);
module.exports=Users;
