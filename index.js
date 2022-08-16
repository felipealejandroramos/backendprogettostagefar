const express = require("express");
const app = express();
cors =require('cors')
const api = require('./api/indexapi.js')
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({extended: true}));

app.use('/', function(req,res,next){
    console.log(req.method, req.body);
    next();
});

app.use('/', api);

app.listen(3000, function () {
    
    console.log(" sever avviato nella porta: 3000" );
    
})