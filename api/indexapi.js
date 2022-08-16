const utenti = require("./utenti/index")
const eventi = require("./eventi/index")
const express = require("express");


const router = express.Router();


router.post('agungi/', utenti.agungiutente);
router.put('/accedi', utenti.accedi);
router.post('/agungi/:id', eventi.agungieveto);
router.delete('/elimina/:id', eventi.eliminaevento);
router.put('/modifica/:id', eventi.modificaevento);
router.put('/toggle/:id', eventi.togglecaevento);

module.exports = router;

