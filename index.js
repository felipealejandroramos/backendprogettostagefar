const utenti = require("./api/utenti/index")
const express = require("express");
const app = express();
cors =require('cors')
const api = require('./api/router.js')

app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use('/', function(req,res,next){
    console.log(req.method, req.body);
    next();
});

app.use('/', api);

const PORT =process.env.PORT || 3000;

app.listen(PORT,function () {
    
    console.log(" sever avviato nella porta: " + PORT);
    
})


