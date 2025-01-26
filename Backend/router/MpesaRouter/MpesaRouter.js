const {get_access_token} = require('../../controller/PaymentController/MpesaController')
const {stk_push} = require('../../controller/PaymentController/MpesaController')
const {mpesaCallbackHandler} = require('../../controller/PaymentController/MpesaController')
const express = require('express')
const router = express.Router()

router.get('/getToken', get_access_token)
router.post('/stkpush', stk_push)
router.post('/callback', mpesaCallbackHandler);

module.exports = router