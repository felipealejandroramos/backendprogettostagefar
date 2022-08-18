const mongoose = require("mongoose");
const eventoSchema = new mongoose.Schema({

    creatore: {
        type: String,
    },
    nome: {
        type: String,
        
    },
    completato: {
        type: Boolean
    }
});
const eventimodel = mongoose.model("modello", eventoSchema);


async function cerca(evento,callback){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.findOne({nome: evento.body.nome,creatore:evento.params.id},function(err,data){
        let risposta;
        if(data===null)
            risposta=false
            // scrive
        else
            risposta=true;
            // erorre

        callback(err,risposta)

    });
};
async function elimina(evento){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");

    eventimodel.deleteOne({nome: evento.body.nome,creatore:evento.params.id},function(err,evento){})
};
async function scrivi(evento){
    if(evento.body.nome==null)
        return
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    
    let novoevento = new eventimodel({nome: evento.body.nome , completato: false , creatore: evento.params.id});
    await novoevento.save();
    console.log("scritto "+novoevento);
};

async function toggle(evento) {
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.findOne({nome: evento.body.nome,creatore:evento.params.id},function(err,data){
    let opposto =true
    if(data.completato)
        opposto=false
        
        eventimodel.updateOne({nome: evento.body.nome,creatore: evento.params.id},{completato: opposto })
    });
}
async function leggi(evento,callback){
    await mongoose.connect("mongodb+srv://app:app@cluster0.evzpwjo.mongodb.net/?retryWrites=true&w=majority");
    eventimodel.find({creatore: evento.params.id},function(err,evento){
        callback(err,evento);
    });
}

module.exports ={
    cancellaevento: function(evento){
        elimina(evento)
    },
    datieventi: function(evento ,callback){
        leggi(evento ,function(err,data){
            if (err) 
                throw err
            callback(false,data)
        })

    },
    cercaevento: function(evento ,callback){
        cerca(evento,function(err,data){
            
            callback(false,data);
        })

    },
    scrivievento: function(evento ,edipendente,callback){
        console.log(evento);
        scrivi(evento).catch((error)=> console.log(error));
    
    },/*
    modificaevento: function(evento){
        modifica(evento)
    },*/
    toggleevento: function(evento){
        toggle(evento)
    }


}