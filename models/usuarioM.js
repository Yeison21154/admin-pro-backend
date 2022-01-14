const {Schema,model} = require('mongoose');

const UsuarioSchema= Schema({
nombre:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
},
img:{
    type:String,
},
rol:{
    type:String,
    require:true,
    default:'USER_ROLE'
},
google:{
    type:String,
    default:false
},
Estado:{
    type: String,
    default:'Activo'
}
});
//Modificar lo que me va a retornar mi objeto JSON
UsuarioSchema.method('toJSON',function(){
    const {__v,_id,password,...Object} = this.toObject();
    Object.uid=_id;
    return Object;
})
module.exports = model('Usuario',UsuarioSchema);