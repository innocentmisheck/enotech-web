const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const transactionData = require('../../public/js/Transcations');


//Get all members with the transcations
router.get('/', (req, res) => res.json(transactionData));

//Get single member
router.get('/:visitorId', (req, res) => {
    const found = transactionData.some(transactionData => transactionData.visitorId === parseInt(req.params.visitorId));

    if (found) {
        res.json(transactionData.filter(transactionData => transactionData.visitorId === parseInt(req.params.visitorId)));

    } else {
        res.status(400).json({ msg: `No Supporter with the id of ${req.params.visitorId}` })
    }

});

//Make a new transcattions

router.post('/', (req, res) => {

    // res.send(req.body);
    const newTransactions = {
        visitorId: uuid.v4(),
        amount: req.body.amount,
        date: req.body.date,
        email: req.body.email,
        status: 'Active'

    };

    if (!newTransactions.email || !newTransactions.amount) {
        return res.status(400).json({ msg: 'Please include your email and amount' });

    }

    transactionData.push(newTransactions);
    //console.log(newTransactions);
    //res.json(transactionData);
    res.redirect('/project_support');

});



//UpdateTranscations

router.put('/:visitorId', (req, res) => {
    const found = transactionData.some(transactionData => transactionData.visitorId === parseInt(req.params.visitorId));

    if (found) {
        const updateTrans = req.body;
        transactionData.forEach(transactions => {
            if (transactions.visitorId === parseInt(req.params.visitorId)) {
                transactions.amount = updateTrans.amount ? updateTrans : transactions.amount;
                transactions.email = updateTrans.email ? updateTrans : transactions.email;
                transactions.date = updateTrans.date ? updateTrans : transactions.date;

                res.json({ msg: 'Transcations updated successfully', transactions });

            }
        });


    } else {
        res.status(400).json({ msg: `No Supporter with the id of ${req.params.visitorId}` })
    }

});

//Delete transcations
router.delete('/:visitorId', (req, res) => {
    const found = transactionData.some(transactionData => transactionData.visitorId === parseInt(req.params.visitorId));

    if (found) {
        res.json({
            msg: 'Transcation deleted successfully',
            transactionData: transactionData.filter(transactionData => transactionData.visitorId !== parseInt(req.params.visitorId))
        });

    } else {
        res.status(400).json({ msg: `No Supporter with the id of ${req.params.visitorId}` })
    }

});

module.exports = router;