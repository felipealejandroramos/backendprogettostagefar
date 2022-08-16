const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 6
    },
    password: {
        type: String,
        required: true
    }
});


async function elimina(utente){
    await mongoose.connect(MONGODB_URI);
    userSchema.deleteOne({username: utente.username},function(err,user){})
};

async function scrivi(utente){
    if(utente.username==null)
        return
    let db = await mongoose.connect(MONGODB_URI);
    
    let novoutente = new userSchema({username: utente.username , password: utente.password});
    await novoutente.save();
    console.log("scritto "+novoutente);
}

async function cercadati(utente ,callback){
   
    await mongoose.connect(MONGODB_URI);
    userSchema.findOne({username: utente.username},function(err,user){
        if(user.password === utente.password)
            callback(false,user)

    
    });
}
async function cerca(utente ,callback){
    await mongoose.connect(MONGODB_URI);
    userSchema.findOne({username: utente.username},function(err,user){
        let risposta;
        if(user===null)
            risposta=false
            // scrive
        else
            risposta=true;
            // erorre

        callback(err,risposta)
    });
}




module.exports = {
  
    cancellautente: function(utente){
        elimina(utente)
    },

    datiutente: function(utente ,callback){
        cercadati(utente,function(err,data){
            if (err) 
                throw err
            callback(false,data)
        })

    },

    cercautente: function(utente ,callback){
        cerca(utente,function(err,data){
            
            callback(false,data);
        })

    },
    

    scriviutente: function(utente ,edipendente,callback){
        console.log(utente);
        scrivi(utente, edipendente).catch((error)=> console.log(error));
        callback(true)
        
    },

 
 
}