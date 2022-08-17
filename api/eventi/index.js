
const modelli = require("./model")


module.exports = {

    eliminaevento: function(req,res){
      modelli.cercaevento(req, function(err,data){
          if(data){
              modelli.cancellaevento(req)
              res.send("evento eliminato")
          }
          else{
              res.send("evento inesistente");
          }
      })
  },
    modificaevento: function(req,res){
        modelli.cercaevento(req, function(err,data){
            if(data){
            modelli.modificaevento(req)
            res.send("nome cambiato");
            }
            else{
                res.send("evento inesistente");
            }
         })
    },
    togglecaevento: function(req,res){
        modelli.cercaevento(req, function(err,data){
            if(data){
            modelli.toggleevento(req)
            res.send("stato cambiato");
            }
            else{
                res.send("evento inesistente");
            }
         })

    }
  ,
  getevento: function(req,res){
      modelli.cercaevento(req,function(err,dati){
          if(dati){
              modelli.datieventi( req, function(err,data){
                      res.send(data)
          })}
          else 
              res.send(false)
  
  })},
  agungieveto: function(req, res){
      modelli.cercaevento(req, function(err,data){                                                                        
          if(data)
              res.send("esiste gia")
          else{
              modelli.scrivievento(req,true);
              res.send("evento creato")
          }
      });
  
  
  
  },
  
  
  }