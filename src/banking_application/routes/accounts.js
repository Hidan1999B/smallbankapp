const express = require('express');
const router = express.Router();
const Account = require('../models/account');

//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        // 1. return accounts from database instead
        return res.json(await Account.find().exec());
    } catch (err) {
        console.log({ message: err.message })
    };
});
//Endpoint for adding user
router.post('/', async (req, res) => {
    return res.json(await Account.create(req.body));

});

// Implement a new endpoint, that will be able to return a specific account by id. 
// instead of just printing, return the actual account. 
router.get('/:id', async (req, res) => {
    try {
        // 1. return accounts from database instead
        return res.json(await Account.findById(req.params.id).exec());
    } catch (err) {
        console.log({ message: err.message })
    };
});

//getting balance only
router.get('/:id/balance', async (req, res) => {
    try {
        let account = await Account.findById(req.params.id);
        if (account) return res.status(200).json(account.client_id +":  "+account.balance);
        return res.status(404).send("Account not found");
    } catch (err) {
        console.log({ message: err.message })
    };
});
// remove by posting ID and then having the endpoint
router.delete('/:id/remove', async (req, res) => { 
 try {
 let z = await Account.findByIdAndRemove(req.params.id);
    if(z) {
    return res.status(200).json("Account " + req.params.id +  " deleted" );
    } else {
         return res.status(404).send("Account not found");
    } 
 }catch(err) {
        console.log({message: err.message})
    }
    });
router.put('/:id/update', async (req, res) => { 
   try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        await Account.findByIdAndUpdate(req.params.id, {$inc:{ "balance": req.body.balance}})
            return res.status(200).json("Balance updated:  " + req.body.balance);
        }else {
    return res.status(404).send("ID wrong.");
        }
    } catch(err) {
        console.log({message: err.message})
    }
});
router.put('/transfer', async (req, res) => { 
  try {
      let throughAccount = await Account.findById(req.body.throughAccount)
       let intoAccount = await Account.findById(req.body.intoAccount)
       let throughBalance = throughAccount.balance;
      let intoBalance = intoAccount.balance;
      let amount = req.body.amount;
      
     if(throughBalance > amount) {
         throughBalance = throughBalance - amount;
         await Account.findByIdAndUpdate(req.body.throughAccount, {$set: {balance: throughBalance}})
         res.status(200).send("funds sent: " + amount +" to account: " + throughAccount.alias + " into account " + intoAccount.alias );
     } else {
         res.status(404).send('insufficient funds');
     }
      intoBalance = intoBalance + amount;
      await Account.findByIdAndUpdate(req.body.intoAccount, {$set: {balance: intoBalance}})
  } catch(err) {
        console.log({message: err.message})
    }
});
/*
gammelt forsøg
router.put('/transfer', async (req, res) => { 
   try {
       const toAccount = await Account.findOne({ _id: req.body._id })
       const fromAccount = await Account.findOne({ _id: req.body._id})
toAccount.balance = toAccount.balance + amount.req.body;  
fromAccount.balance = fromAccount.balance - amount.req.body;         
            return res.status(200).json("Balance updated:  " + toAccount.balance);
    } catch(err) {
        console.log({message: err.message})
    }
});

 */
module.exports = router;