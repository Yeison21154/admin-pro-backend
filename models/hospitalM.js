const {Schema,model} = require('mongoose');

const HospitalSchema= Schema({
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
Sucursal:{
    type:String
}
},{collection:'hospitales'});
//Modificar lo que me va a retornar mi objeto JSON
HospitalSchema.method('toJSON',function(){
    const {__v,...Object} = this.toObject();
    return Object;
})
module.exports = model('Hospitales',HospitalSchema);