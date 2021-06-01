const OBJ = require('../models/birth');
let latest = require('../models/latesthash');
let user = require("../models/user");
let Block = require("../models/birthblock");
const US = require('../models/userclass');

function createBlock(req, res) {//Query is name,DOB,privatekey,userhash,FName,MName
    try {
        latest.findOne({ ide: 3 }, (err, block) => {
            let prev_hash1 = block.latesthash;
            user.findOne({ u_id: req.body.u_id }, (err, x) => {
                if (!x) {
                    res.render('docform', { message: "Cannot find user!" });
                } else {
                    let aad = new OBJ(req.body.name, req.body.DOB, req.body.fromAddress, req.body.MName, req.body.FName, req.body.userhash);
                    obj = { Birth: aad, hash: aad.calculateHash(), fromAddress: req.body.fromAddress, toAddress: x.privatekey, prev_hash: prev_hash1 };
                    var newBlock = new Block(obj);
                    newBlock.save((err, block) => {
                        if (err) {
                            res.send(err);
                        }
                        else { //If no errors, send it back to the client
                            latest.updateOne({ ide: 3 }, { latesthash: block.hash }, (err, op) => {
                                if (err) { res.send({ message: "Latest hash could not be updated" }); return}
                            });
                            if (err) { res.render('docform', { message: "user hash could not be updated" });return }

                            hshs = x.hashs;
                            hshs.hash3 = block.hash;
                            let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                            user.updateOne({ hash: req.body.userhash }, { hash: userr.calculateHash(), hashs: hshs }, (err, userres) => {
                                if (err) { res.render('docform', { message: "Birth hash could not be updated in user" }); }
                                else { res.render('docform', { message: "Birth Hash successfully added to User!" }); }
                            });
                        }
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
        res.send({ message: "Birth Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.dochash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "Birth details Not Found" });
                    //If no errors, send it back to the client
                } else {
                    try {
                        b = new OBJ(block.Birth.name, block.Birth.DOB, block.Birth.signature, block.Birth.MName, block.Birth.FName, block.Birth.user);
                        if (b.SignatureisValid) {
                            res.send(block.Birth);
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
        res.send({ message: "Birth Hash required" });
    }
    else {
        Block.findOne({ hash: req.query.dochash }, (err, block) => {
            if (err) {
                res.send(err);
            }
            else {
                if (block == null || block == "") {
                    res.send({ message: "Birth details Not found" });
                }
                else {
                    try {
                        let b = new OBJ(block.Birth.name, block.Birth.DOB, block.Birth.signature, block.Birth.MName, block.Birth.FName, block.Birth.user);
                        if (req.query.name) {
                            b.name = req.query.name;
                        }
                        if (req.query.DOB) {
                            b.DOB = req.query.DOB;
                        }
                        if (req.query.MName) {
                            b.DOB = req.query.MName;
                        }
                        if (req.query.FName) {
                            b.DOB = req.query.FName;
                        }
                        latest.findOne({ ide: 3 }, (err, blo) => {
                            let prev_hash1 = blo.latesthash;
                            obj = { Birth: b, hash: b.calculateHash(), fromAddress: req.query.fromAddress, toAddress: block.toAddress, prev_hash: prev_hash1 };
                            var newBlock = new Block(obj);
                            newBlock.save((err, block) => {
                                if (err) {
                                    res.send(err);
                                }
                                else { //If no errors, send it back to the client
                                    latest.updateOne({ ide: 3 }, { latesthash: block.hash }, (err, op) => {
                                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                                    });
                                    user.findOne({ hash: req.query.userhash }, (err, x) => {
                                        if (!x) {
                                            res.send({ message: "Cannot find user!" });
                                        } else {
                                            hshs = x.hashs;
                                            hshs.hash3 = block.hash;
                                            let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
                                            user.updateOne({ hash: req.query.userhash }, { hash: userr.calculateHash(), hashs: hshs }, (err, userres) => {
                                                if (err) { res.send({ message: "Birth hash could not be updated in user" }); }
                                                else { res.send({ message: "Birth Hash successfully added to User!", block, userres }); }
                                            });
                                        }
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
    newblock = new OBJ(block.Birth.name, block.Birth.DOB, block.Birth.Address, block.Birth.signature, block.Birth.MName, block.Birth.FName, block.Birth.user);
    newblock.signature = block.Birth.signature;
    if (newblock.SignatureisValid()) {
        return (newblock.calculateHash() == block.hash);
    } else {
        return false;
    }
}

module.exports = { createBlock, getBlock, blockisValid, updateBlock }