let mongoose = require("mongoose");
let User = require('../model/user');

function getUser(req, res) {
    let query = User.find({});
    query.exec((err, doc) => {
      if (err) res.send(err);
      res.json(doc);
    });
  }
  
  function createUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() })
    }
    var newUser = new User(req.body);
    newUser.save((err, ntype) => {
      if (err) {
        res.status(422).json({ msg: message.ERROR.UNEXPECTED_ERR, errors });
        res.json(err);
      } else {
        res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
      }
    });
  
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
    const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
      }
      var ref = req.body.ref;
      User.deleteOne({ u_id: ref }, function (err, obj) {
        if (err) {
              res.status(422).json({ msg: message.error.UNEXPRECTED_ERR, error });
              res.json(err);
          } else {
              res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
          }
      });
  }
  module.exports = { updateUser, createUser, deleteUser, getUser };
