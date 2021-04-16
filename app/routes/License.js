const Lic = require('../models/license.js');
let latest = require('../models/latesthash');
let user = require("../models/user");
let Block = require("../models/licenseBlock");
const US = require('../models/userclass');

function createlicense(req, res) {
    try {
        latest.findOne({ ide: 1 }, (err, block) => {
            let prev_hash1 = block.latesthash;
            let lic = new Lic(req.query.name, req.query.DOB, req.query.Address, req.query.Expiry, req.query.privatekey, req.query.userhash);
            obj = { License: lic, hash: lic.calculateHash(), fromAddress: req.query.fromAddress, toAddress: req.query.privatekey, prev_hash: prev_hash1 };
            var newBlock = new Block(obj);
            newBlock.save((err, block) => {
                if (err) {
                    message = err;
                }
                else { //If no errors, send it back to the client
                    latest.updateOne({ ide: 1 }, { latesthash: block.hash }, (err, op) => {
                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                    });
                    user.findOne({hash: req.query.userhash},(err,x)=>{
                        if (!x){
                            res.send({message: "Cannot find user!"});
                        }
                        hshs=x.hashs;
                        hshs.hash1=block.hash;
                        let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                        user.updateOne({hash: req.query.userhash},{hash : userr.calculateHash(), hashs: hshs},(err,userres)=>{
                            if (err) { res.send({ message: "License hash could not be updated in user" }); }
                            else { res.send({ message: "License Hash successfully added to User!", block,userres }); }
                        });
                    });
                }
            });
        });
    } catch (e) {
        res.send(e);
    }
}

function getBlock(req, res) {
    if (!req.query.lichash) {
        res.send({ message: "Licence Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.lichash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "License Not Found" });
                    //If no errors, send it back to the client
                } else {
                    try {
                        b = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, "Placeholder");
                        b.signature = block.License.signature;
                        if (b.SignatureisValid) {
                            res.send(b);
                        } else {
                            res.send({ message: "Block has been compromised" });
                        }
                    } catch (e) {
                        res.send(e);
                    }
                }
            }
        });
    }
}

function updateBlock(req, res) {
    if (!req.query.lichash) {
        res.send({ message: "Licence Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.lichash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "License Not found" });
                }
                else {
                    try {
                        let b = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, "Placeholder");
                        b.signature = block.License.signature;
                        if (req.query.name) {
                            b.name = req.query.name;
                        }
                        if (req.query.DOB) {
                            b.DOB = req.query.DOB;
                        }
                        if (req.query.Address) {
                            b.Address = req.query.Address;
                        }
                        if (req.query.Expiry) {
                            b.Expiry = req.query.Expiry;
                        }
                        latest.findOne({ ide: 1 }, (err, blo) => {
                            let prev_hash1 = blo.latesthash;
                            obj = { License: b, hash: b.calculateHash(), fromAddress: req.query.fromAddress, toAddress: block.toAddress, prev_hash: prev_hash1 };
                            var newBlock = new Block(obj);
                            newBlock.save((err, block) => {
                                if (err) {
                                    res.send(err);
                                }
                                else { //If no errors, send it back to the client
                                    latest.updateOne({ ide: 1 }, { latesthash: block.hash }, (err, op) => {
                                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                                    });
                                    user.findOne({hash: req.query.userhash},(err,x)=>{
                                        if (!x){
                                            res.send({message: "Cannot find user!"});
                                        }
                                        hshs=x.hashs;
                                        hshs.hash1=block.hash;
                                        let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                                        user.updateOne({hash: req.query.userhash},{hash : userr.calculateHash(), hashs: hshs},(err,userres)=>{
                                            if (err) { res.send({ message: "License hash could not be updated in user" }); }
                                            else { res.send({ message: "License Hash successfully added to User!", block,userres }); }
                                        });
                                    });
                                }
                            });
                        });
                    } catch (e) {
                        res.send(e);
                    }
                }
            }
        });
    }
}
function blockisValid(block) {
    newblock = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, '',block.user);
    newblock.signature = block.License.signature;
    if (newblock.SignatureisValid()) {
        return (newblock.calculateHash() == block.hash);
    } else {
        return false;
    }
}

module.exports = { createlicense, getBlock, blockisValid, updateBlock }