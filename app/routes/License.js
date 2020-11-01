const Lic = require('../models/license.js');
let mongoose = require('mongoose');
let Block = require('../models/licenseBlock');
const keygen = require('../models/Keygen')
const blockid= "5f9d3d7e6184971f84380ea0"
// let license = require('../models/license');
/*
 * POST /book to save a new book.
 */
function createlicense(req, res) {
    try{
        let lic = new Lic(req.query.name,req.query.DOB,req.query.toAddress,req.query.Expiry,req.query.privkey);
        obj = {License: lic,hash: lic.calculateHash(),fromAddress: req.query.fromAddress,toAddress: req.query.toAddress,prev_hash: getlatest()};
        var newBlock = new Block(obj);
        newBlock.save((err,block) => {
            if(err) {
                res.json(err);
            }
            else { //If no errors, send it back to the client
                updatelatest(block.hash);
                res.json({message: "Block successfully added!", block });
            }
        });
    }catch(e){
        res.send(e);
    }
    
}

function getlatest(){
    Block.findById(blockid,(err,block)=>{
        if(err) res.send(err);
        return block.latesthash;
    });
}

function updatelatest(hash){
    Block.updateOne({_id:blockid},{latesthash: hash},(err,block)=>{
        if(err) console.log(err);
    });
}

function getBlock(req, res) {
    Block.findById(req.params.id, (err, block) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        b=new Lic(block.License.name,block.License.DOB,block.License.Address,block.License.Expiry,req.params.privkey);
        if(b.SignatureisValid){
            res.json(JSON.stringify(b));
        }else{
            res.json({message:"Block has been compromised"})
        }
    });        
}

function updateBlock(req, res) {
    Block.findOne({hash: req.params.lichash}, (err, block) => {
        if(err) res.send(err);
        newblock=new Lic(block.License.name,block.License.DOB,block.License.Address,block.License.Expiry,req.params.privkey)
        if(req.params.name){
            newblock.name=req.params.name;
        }
        if(req.params.DOB){
            newblock.DOB=req.params.DOB;
        }
        if(req.params.Address){
            newblock.Address=req.params.Address;
        }
        if(req.params.Expiry){
            newblock.Expiry=req.params.Expiry;
        }
        Block.updateOne({hash: req.params.lichash},JSON.stringify(newblock),(err,block)=>{
            if(err) res.send(err);
            res.json(block);
        })
    });
}
function blockisValid(block) {
    newblock=new Lic(block.License.name,block.License.DOB,block.License.Address,block.License.Expiry,req.params.privkey);
    if(newblock.SignatureisValid()){
        return (newblock.calculateHash()==block.hash);
    }else{
        return false;
    }
}

module.exports = {createlicense,getBlock,blockisValid,updateBlock}