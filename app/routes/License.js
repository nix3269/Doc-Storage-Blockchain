const Lic = require('../models/license.js');
let mongoose = require('mongoose');
let Block = require('../models/licenseBlock');
let latest = require('../models/latesthash');
const keygen = require('../models/Keygen');
// let license = require('../models/license');
/*
 * POST /book to save a new book.
 */
function createlicense(req, res) {
    try {
        latest.findOne({ ide: 1 }, (err, block) => {
            let prev_hash1 = block.latesthash;
            let lic = new Lic(req.query.name, req.query.DOB, req.query.toAddress, req.query.Expiry, req.query.privkey);
            obj = { License: lic, hash: lic.calculateHash(), fromAddress: req.query.fromAddress, toAddress: req.query.toAddress, prev_hash: prev_hash1 };
            var newBlock = new Block(obj);
            newBlock.save((err, block) => {
                if (err) {
                    message = err;
                }
                else { //If no errors, send it back to the client
                    latest.updateOne({ ide: 1 }, { latesthash: block.hash }, (err, op) => {
                        if (err) { res.send({ message: "Latest hash could not be updated" }); }
                        else { res.send({ message: "Block successfully added!", block }); }
                    });
                }
            });
        });

    } catch (e) {
        res.send(e);
    }
}

function getBlock(req, res) {
    let message;
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
                        b.signature = b.signTransaction(keygen.genFromPri(req.query.privkey));
                        Block.updateOne(block, { License: b }, (err, block2) => {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.send(block2);
                            }
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
    newblock = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, "Placeholder");
    newblock.signature = block.License.signature;
    if (newblock.SignatureisValid()) {
        return (newblock.calculateHash() == block.hash);
    } else {
        return false;
    }
}

module.exports = { createlicense, getBlock, blockisValid, updateBlock }