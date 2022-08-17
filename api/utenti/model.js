
const mongoose = require("mongoose");
const utentiSchema = new mongoose.Schema({
    username: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    }
});

const utentimodel = mongoose.model("utente", utentiSchema);

async function elimina(utente){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    utentimodel.deleteOne({username: utente.username},function(err,user){})
};

async function scrivi(utente){
    if(utente.username==null)
        return
     await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    
    let novoutente = new utentimodel({username:utente.username,password:utente.password})
    await novoutente.save();
    console.log("scritto "+novoutente);
}

async function cercadati(utente ,callback){
   
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    utentimodel.findOne({username: utente.username },function(err,user){
        if(user.password === utente.password)
            callback(false,user)

    
    });
}
async function cerca(utente ,callback){
    
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    utentimodel.findOne({username: utente.username},function(err,user){
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
    // specifico
    datiutente: function(utente ,callback){
        cercadati(utente,function(err,data){
            if (err) 
                throw err
            callback(false,data)
        })

    },
    //esistenza
    cercautente: function(utente ,callback){
        cerca(utente,function(err,data){
            
            callback(false,data);
        })

    },
    

    scriviutente: function(utente ,callback){
        console.log(utente);
        scrivi(utente).catch((error)=> console.log(error));
        
        
    },

 
 
}
