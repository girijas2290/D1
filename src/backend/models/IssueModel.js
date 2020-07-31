const mongoose=require('mongoose');

const  Issueschema=new mongoose.Schema({
    Issuenumber:
    {
        type:String,
        required:[true,'please mention the number'],
        unique:true
    },
    Issuetype:
    {
        type:String,
        required:[true,'please mention issuetype'],
        enum:
        {
            values:['production','testing','development'],
            message:'Issuetype must be production,testing,development'
        }
    },
        
});

const Issues=mongoose.model('Issue',Issueschema);
module.exports=Issues;
