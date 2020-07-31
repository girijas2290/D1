const express=require('express');
const issuecontroller=require('../controllers/issuecontroller');
const issuerouter=express.Router();


issuerouter.route('/').get(issuecontroller.getallissues).
        post(issuecontroller.createissue);    
issuerouter.route('/:id').get(issuecontroller.getissuebyid).patch(issuecontroller.updateissue)
                .delete(issuecontroller.deleteissue);

module.exports=issuerouter;        