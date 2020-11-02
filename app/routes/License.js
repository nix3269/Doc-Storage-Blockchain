const Lic = require('../models/license.js');
let mongoose = require('mongoose');
let Block = require('../models/licenseBlock');
let latest = require('../models/latesthash');
const keygen = require('../models/Keygen');
const blockid = "5f9d3d7e6184971f84380ea0"
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
                    res.json(err);
                }
                else { //If no errors, send it back to the client
                    latest.updateOne({ ide: 1 }, { latesthash: block.hash }, (err, op) => {
                        if (err) { res.json({ message: "Latest hash could not be updated" }); }
                        else { res.json({ message: "Block successfully added!", block }); }
                    });
                }
            });
        });

    } catch (e) {
        res.send(e);
    }
}

function getBlock(req, res) {
    if (!req.query.lichash) res.json({ message: "Licence Hash required" })
    Block.findOne({ hash: req.query.lichash }, (err, block) => {
        if (err) res.send(err);
        if (block == null || block == "") {
            res.json({ message: "License Not found" });
            //If no errors, send it back to the client
        } else {
            try {
                b = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, "Placeholder");
                b.signature = block.License.signature;
                if (b.SignatureisValid) {
                    res.json(b);
                } else {
                    res.json({ message: "Block has been compromised" })
                }
            } catch (e) {
                res.send(e);
            }
        }
    });
}

function updateBlock(req, res) {
    if (!req.query.lichash) res.json({ message: "Licence Hash required" })
    Block.findOne({ hash: req.query.lichash }, (err, block) => {
        if (err) res.send(err);
        if (block == null || block == "") { res.json({ message: "License Not found" }); } else {
            try {
                newblock = new Lic(block.License.name, block.License.DOB, block.License.Address, block.License.Expiry, "Placeholder");
                b.signature = block.License.signature;
                if (req.params.name) {
                    newblock.name = req.params.name;
                }
                if (req.params.DOB) {
                    newblock.DOB = req.params.DOB;
                }
                if (req.params.Address) {
                    newblock.Address = req.params.Address;
                }
                if (req.params.Expiry) {
                    newblock.Expiry = req.params.Expiry;
                }
                newblock.signature = newblock.signTransaction(keygen.genFromPri(req.query.prikey));
                Block.updateOne({ hash: req.params.lichash }, { License: newblock }, (err, block) => {
                    if (err) res.send(err);
                    res.json(block);
                })
            } catch (e) {
                res.send(e);
            }
        }
    });
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