const mongoose=require('mongoose');

const  projectschema=new mongoose.Schema({
    projectnumber:
    {
        type:String,
        required:[true,'please mention the number'],
        unique:true
    },
    projectType:
    {
        type:String,
        required:[true,'please mention projectType'],
        enum:
        {
            values:['support','development'],
            message:'projectType must be support,development'
        }
    },
    projectclient:
    {
        type:String,
        required:[true,'A project must have a client']
    }
        
});

const Projects=mongoose.model('Projects',projectschema);
module.exports=Projects;
