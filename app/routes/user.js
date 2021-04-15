let User = require('../models/user');
const US = require('../models/userclass');

function getUser(req, res) {
  let query = User.find({});
  query.exec((err, doc) => {
    if (err) res.send(err);
    res.json(doc);
  });
}

function createUser(req, res) {
  // const errors = validationResult(req);
  let userr = new US(req.query.u_name, req.query.pass, req.query.u_phone, {});
  obj = { hash: userr.calculateHash(), u_name: req.query.u_name, u_phone: req.query.u_phone ,pass: req.query.pass};
  var newBlock = new User(obj);
  newBlock.save((err, block) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send({message:"User created succesfuly",block});
    }
  });
}
function updateUser(req, res) {
  user.findOne({hash: req.query.userhash},(err,x)=>{
    if (!x){
        res.send({message: "Cannot find user!"});
    }
    let userr = new US(x.u_name, x.pass, x.u_phone, hshs);
    userr.setvals();
    user.updateOne({hash: req.query.userhash},{hash : userr.calculateHash(), u_name: userr.u_name, u_phone: userr.u_phone, pass: userr.pass},(err,userres)=>{
        if (err) { res.send({ message: "User could not be updated", Err : err }); }
        else { res.send({ message: "User Updated successfully !"}); }
    });
});

}

function deleteUser(req, res) {

}
module.exports = { updateUser, createUser, deleteUser, getUser };
