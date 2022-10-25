const client = require('../models/client');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.json(await client.find().exec());
    } catch (err) {
        console.log({ message: err.message })
    };
});

router.post('/', async (req, res) => {
    return res.json(await client.create(req.body));

});

router.get('/:id', async (req, res) => {
    try {
        return res.json(await client.findById(req.params.id).exec());
    } catch (err) {
        console.log({ message: err.message })
    };
});

router.delete('/:id/remove', async (req, res) => { 
 try {
 let z = await client.findByIdAndRemove(req.params.id);
    if(z) {
    return res.status(200).json("Client " + req.params.id +  " deleted");
    } else {
         return res.status(404).send("Client not found");
    } 
 }catch(err) {
        console.log({message: err.message})
    }
});
// update details if u want
router.put('/:id/update', async (req, res) => {     
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  
        await client.findByIdAndUpdate(req.params.id, {"firstName": req.body.firstName, "lastName": req.body.lastName, "streetAddress": req.body.streetAddress, "city": req.body.city})
            return res.status(200).json("Client updated  " + req.body.firstName +  " " + req.body.lastName);
        }else {
    return res.status(404).send("ID wrong.");

        }
    } catch(err) {
        console.log({message: err.message})
    }
});
module.exports = router;