const modelli =require('./model.js') 

module.exports ={
     accedi: function(req,res){
        
    },
    eliminautente: function(req,res){
        modelli.cercautente(req.body, function(err,data){
            if(data){
                modelli.cancellautente(req.body)
                res.send("utente eliminato")
            }
            else{
                res.send("utente inesistente");
            }
        })
    },

    getutente: function(req,res){
        modelli.cercautente(req.body,function(err,dati){
            if(dati){
                modelli.datiutente( req.body, function(err,data){
                    if(data.password===req.body.password)
                        res.send(data)
                    else
                        res.send(false)
            })}
            else 
                res.send(false)

    })},
    agungiutente: function(req, res){
        modelli.cercautente(req.body, function(err,data){                                                                        
            if(data)
                res.send("utente gia registrato")
            else{
                modelli.scriviutente(req.body,true);
                res.send("utente aggiunto")
            }
        });
    }
}