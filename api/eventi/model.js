const mongoose = require("mongoose");
const eventoSchema = new mongoose.Schema({

    creatore: {
        type: String,
    },
    nome: {
        type: String,
        minlength: 6
    },
    comletato: {
        type: Boolean
    }
});
const eventimodel = mongoose.model("modello", eventoSchema);


async function cerca(evento){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.findOne({nome: evento.body.nome,creatore:evento.params},function(err,evento){
        callback(err,evento);
    });
};
async function elimina(evento){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.deleteOne({nome: evento.body.nome,creatore:evento.params},function(err,evento){})
};
async function scrivi(evento){
    if(evento.body.nome==null)
        return
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    
    let novoevento = new eventimodel({nome: evento.body.nome , completato: false , creatore: evento.params});
    await novoevento.save();
    console.log("scritto "+novoevento);
};
async function modifica(evento,nuovonome) {
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.updateOne({nome: evento.body.nome,creatore: evento.params},{nome:nuovonome})
};
async function toggle(evento) {
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    let opposto
    if(evento.body.comletato)
        opposto=false
    else
        opposto=true

        eventimodel.updateOne({nome: evento.body.nome,creatore: evento.params},{completato: opposto })
}
async function leggi(callback){
    await mongoose.connect("mongodb://127.0.0.1:27017/user");
    utentimodel.find(function(err,utenti){
        callback(err,utenti);
    });
}

module.exports ={
    cancellaevento: function(evento){
        elimina(evento)
    },
    datieventi: function(evento ,callback){
        leggi(evento,function(err,data){
            if (err) 
                throw err
            callback(false,data)
        })

    },
    cercaevento: function(evento ,callback){
        cerca(evento,function(err,data){
            let esiste
            if(data!=null)
                esiste=true
            else
                esiste= false

            callback(false,esiste);
        })

    },
    scrivievento: function(evento ,edipendente,callback){
        console.log(evento);
        scrivi(evento).catch((error)=> console.log(error));
        callback(true)
        
    },
    modificaevento: function(evento){
        modifica(evento)
    },
    toggleevento: function(evento){
        toggle(evento)
    }


}