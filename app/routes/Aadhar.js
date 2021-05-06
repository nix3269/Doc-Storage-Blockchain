const AAD = require('../models/aadhar.js');
let latest = require('../models/latesthash');
let user = require("../models/user");
let Block = require("../models/aadharblock.js");
const US = require('../models/userclass');

function createBlock(req, res) {//Query is name,DOB,Address,privatekey,userhash
    try {
        latest.findOne({ ide: 2 }, (err, block) => {
            let prev_hash1 = block.latesthash;
            let aad = new AAD(req.query.name, req.query.DOB, req.query.Address, req.query.privatekey, req.query.userhash);
            obj = { Aadhar: aad, hash: aad.calculateHash(), fromAddress: req.query.fromAddress, toAddress: req.query.privatekey, prev_hash: prev_hash1 };
            var newBlock = new Block(obj);
            newBlock.save((err, block) => {
                if (err) {
                    res.send(err);
                }
                else { //If no errors, send it back to the client
                    latest.updateOne({ ide: 2 }, { latesthash: block.hash }, (err, op) => {
                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                    });
                    user.findOne({ hash: req.query.userhash }, (err, x) => {
                        if (!x) {
                            res.send({ message: "Cannot find user!" });
                        }
                        hshs = x.hashs;
                        hshs.hash2 = block.hash;
                        let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                        user.updateOne({ hash: req.query.userhash }, { hash: userr.calculateHash(), hashs: hshs }, (err, userres) => {
                            if (err) { res.send({ message: "Aadhar hash could not be updated in user" }); }
                            else { res.send({ message: "Aadhar Hash successfully added to User!", block, userres }); }
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
    if (!req.query.dochash) {
        res.send({ message: "Aadhar Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.docchash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "Aadhar details Not Found" });
                    //If no errors, send it back to the client
                } else {
                    try {
                        b = new AAD(block.Aadhar.name, block.Aadhar.DOB, block.Aadhar.Address, "Placeholder");
                        b.signature = block.Aadhar.signature;
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
    if (!req.query.dochash) {
        res.send({ message: "Aadhar Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.dochash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "Aadhar details Not found" });
                }
                else {
                    try {
                        let b = new AAD(block.Aadhar.name, block.Aadhar.DOB, block.Aadhar.Address, "Placeholder");
                        b.signature = block.Aadhar.signature;
                        if (req.query.name) {
                            b.name = req.query.name;
                        }
                        if (req.query.DOB) {
                            b.DOB = req.query.DOB;
                        }
                        if (req.query.Address) {
                            b.Address = req.query.Address;
                        }
                        latest.findOne({ ide: 2 }, (err, blo) => {
                            let prev_hash1 = blo.latesthash;
                            obj = { Aadhar: b, hash: b.calculateHash(), fromAddress: req.query.fromAddress, toAddress: block.toAddress, prev_hash: prev_hash1 };
                            var newBlock = new Block(obj);
                            newBlock.save((err, block) => {
                                if (err) {
                                    res.send(err);
                                }
                                else { //If no errors, send it back to the client
                                    latest.updateOne({ ide: 2 }, { latesthash: block.hash }, (err, op) => {
                                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                                    });
                                    user.findOne({ hash: req.query.userhash }, (err, x) => {
                                        if (!x) {
                                            res.send({ message: "Cannot find user!" });
                                        }
                                        hshs = x.hashs;
                                        hshs.hash2 = block.hash;
                                        let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                                        user.updateOne({ hash: req.query.userhash }, { hash: userr.calculateHash(), hashs: hshs }, (err, userres) => {
                                            if (err) { res.send({ message: "Aadhar hash could not be updated in user" }); }
                                            else { res.send({ message: "Aadhar Hash successfully added to User!", block, userres }); }
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
    newblock = new AAD(block.Aadhar.name, block.Aadhar.DOB, block.Aadhar.Address, "", block.user);
    newblock.signature = block.Aadhar.signature;
    if (newblock.SignatureisValid()) {
        return (newblock.calculateHash() == block.hash);
    } else {
        return false;
    }
}

module.exports = { createBlock, getBlock, blockisValid, updateBlock }