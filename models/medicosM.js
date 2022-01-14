const {Schema,model} = require('mongoose');

const MedicoSchema= Schema({
nombre:{
    type:String,
    require:true
},
img:{
    type:String,
},
usuario:{
    required:true,
    type:Schema.Types.ObjectId,
    ref:'Usuario'
},
hospital:{
    required:true,
    type:Schema.Types.ObjectId,
    ref:'Hospitales'
}
},{collection:'medicos'});
//Modificar lo que me va a retornar mi objeto JSON
MedicoSchema.method('toJSON',function(){
    const {__v,...Object} = this.toObject();
    return Object;
})
module.exports = model('Medicos',MedicoSchema);