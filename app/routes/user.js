let User = require('../models/user');
const US = require('../models/userclass');
const { v4: uuidv4 } = require('uuid');

function getUser(req, res) {
  let query = User.find({});
  query.exec((err, doc) => {
    if (err) res.send(err);
    res.json(doc);
  });
}

function createUser(req, res) {
  var x = uuidv4();
  let userr = new US(req.body.u_name, req.body.pass, req.body.u_phone, {});
  obj = { u_id: x, hash: userr.calculateHash(), u_name: req.body.u_name, u_email: req.body.u_email, fname: req.body.fname, pass: req.body.pass };
  var newBlock = new User(obj);
  newBlock.save((err, block) => {
    if (err) {
      res.render('ctuser', { message: err });
    }
    else {
      res.render('showcard', { name: block.u_name , u_id : x});
    }
  });
}
function updateUser(req, res) {
  User.findOne({ hash: req.query.userhash }, (err, x) => {
    if (!x) {
      res.send({ message: "Cannot find user!" });
    } else {
      let userr = new US(x.u_name, x.pass, x.u_phone, x.hashs);
      userr.setvals(req.query.u_name, req.query.pass, req.query.u_phone);
      User.updateOne({ hash: req.query.userhash }, { hash: userr.calculateHash(), u_name: userr.u_name, u_phone: userr.u_phone, pass: userr.pass }, (err, userres) => {
        if (err) { res.send({ message: "User could not be updated", Err: err }); }
        else { res.send({ message: "User Updated successfully !" }); }
      });
    }
  });

}

function deleteUser(req, res) {
  if (req.query.userhash) {
    User.deleteOne({ hash: req.query.userhash }, (err, x) => {
      if (err) {
        res.send({ message: "Error occured", ERR: err });
      }
      res.send({ message: "Sucessfully deleted user" })
    });
  } else {
    res.send({ message: "User not found" })
  }
}

function getaUser(req, res) {
  let query = {};
  if (req.body.u_id) {
    query = { u_id: req.body.u_id };
    User.findOne(query, (err, x) => {
      if (err) {
        res.render('index', { message: "Error occured", ERR: err });
      } else {
        if (!x) {
          res.render('index', { message: "User not found" });
        } else {
          res.render('portal', { hash1: x.hashs.hash1, hash2: x.hashs.hash2, hash3: x.hashs.hash3 });
        }
      }
    });
  } else if (req.body.u_email && req.body.pass) {
    query = { u_email: req.body.u_email, pass: req.body.pass };
    User.findOne(query, (err, x) => {
      if (err) {
        res.render('index', { message: "Error occured", ERR: err });
      } else {
        if (!x) {
          res.render('index', { message: "User not found" });
        } else {
          res.render('portal', { hash1: x.hashs.hash1, hash2: x.hashs.hash2, hash3: x.hashs.hash3 });
        }
      }
    });
  } else {
    res.render('index', { message: "Required parameter not entered" });
  }

}
module.exports = { updateUser, createUser, deleteUser, getUser, getaUser };
