const utenti = require("./utenti/index")
const eventi = require("./eventi/index")
const express = require("express");



const router = express.Router();


router.post('/agungi/:id', eventi.agungieveto);// v
router.delete('/elimina/:id', eventi.eliminaevento);//v
//router.put('/modifica/:id', eventi.modificaevento);
router.put('/toggle/:id', eventi.togglecaevento);//m
router.post('/agungi', utenti.agungiutente);//v
router.put('/accedi', utenti.accedi);//v
router.get('/vedi/:id', eventi.getevento) //v


module.exports = router;

