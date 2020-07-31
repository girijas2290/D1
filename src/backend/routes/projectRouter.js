const express=require('express');
const projectcontroller=require('../controllers/projectcontroller');
const projectrouter=express.Router();


projectrouter.route('/').get(projectcontroller.getallprojects).
        post(projectcontroller.createproject);    
projectrouter.route('/:id').get(projectcontroller.getprojectbyid).patch(projectcontroller.updateproject)
                .delete(projectcontroller.deleteproject)

module.exports=projectrouter;        