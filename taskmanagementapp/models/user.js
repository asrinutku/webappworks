const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcr = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'mail adresi zorunlu'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'lutfen gecerli bir email girin'] 
    },
    parola:{
        type:String,
        required:[true,'parola girmek zorunlu'],
        minlength:6
    }
});

userSchema.pre('save',async function(next){

    const salt = await bcr.genSalt();
    this.parola = await bcr.hash(this.parola,salt);
    next();
    
});

userSchema.statics.login = async function(email,parola){
    const user = await this.findOne({email});

    if(user){
        const auth = await bcr.compare(parola,user.parola);
        if(auth){
            return user;
        }
        throw Error('parola-hatası');
    }
    throw Error('email-hatası');
}

const User = mongoose.model('user',userSchema);

module.exports = User;