let mongoose = require("mongoose");
let User = require('../model/user');
const keygen = require('../models/Keygen');
const US = require('../models/userclass');
let latest = require('../models/latesthash');
let Block = require('../models/licenseBlock');

function getUser(req, res) {
  let query = User.find({});
  query.exec((err, doc) => {
    if (err) res.send(err);
    res.json(doc);
  });
}

function createUser(req, res) {
  const errors = validationResult(req)
  let userr = new US(req.query.u_name,req.query.pass,req.query.u_phone,{});
  obj = { User: userr, hash: userr.calculateHash(),u_name: req.query.u_name,u_phone: req.query.u_phone};
  var newBlock = new Block(obj);
            newBlock.save((err, block) => {
                if (err) {
                    message = err;
                }
                else{
                  latest.updateOne({ ide: 1 }, { latesthash: block.hash }, (err, op) => {
                    if (err) { res.send({ message: "Latest hash could not be updated" }); }
                    else { res.send({ message: "Block successfully added!", block }); }
                } );



  try {

  } catch (e) {
    res.send(e);
  }

}

function updateUser(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  var Ref = req.body.ref;
  User.findOne({ u_id: Ref }, function (err, doc) {
    var myquery = doc;
    var newvalues = { $set: req.body };
    User.updateOne(myquery, newvalues, function (err, obj) {
      if (err) {
        res.status(422).json({ msg: message.error.UNEXPRECTED_ERR, error });
        res.json(err);
      } else {
        res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
      }
    });
  });

}

function deleteUser(req, res) {
 
}
module.exports = { updateUser, createUser, deleteUser, getUser };
