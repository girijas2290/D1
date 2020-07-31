const express=require('express');
const usercontroller=require('../controllers/usercontroller');
const userrouter=express.Router();
const authcontroller=require('../controllers/authcontroller');

userrouter.post('/signup',authcontroller.signup);
userrouter.post('/login',authcontroller.login);

userrouter.route('/').get(usercontroller.getalluser).
        post(usercontroller.updateuser);    
userrouter.route('/:id').get(usercontroller.getuserbyid).patch(usercontroller.updateuser)
                .delete(usercontroller.deleteuser);

module.exports=userrouter;        