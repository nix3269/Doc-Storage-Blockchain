let mongoose = require("mongoose");
let Admin = require('../models/admin');

// function createAdmin(req, res) {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       console.log(errors);
//       return res.status(422).json({ errors: errors.array() })
//     }
//     var newAdmin = new Admin(req.body);
//     newAdmin.save((err, ntype) => {
//       if (err) {
//         res.status(422).json({ msg: message.ERROR.UNEXPECTED_ERR, errors });
//         res.json(err);
//       } else {
//         res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
//       }
//     });
//   }
   
  function getAdmin(req,res) {
    let query = Admin.find({});
    query.exec((err, doc) => {
      if (err){
        res.send(err);
      } 
      else {
        res.send({message:"couldnt get admin"});
      }
     
    });
  }
  
  function createAdmin(req, res) {
    let adminn = AD(req.query.a_name,req.query.a_pass,{});
    obj = {a_name: req.query.a_name,a_pass:req.query.a_pass }
    var newB = new admin(obj)
    newB.save((err,block)=>{
      if (err) {
        res.send(err);
      }
      else{
        res.send({message: "Admin is created successfully"})
      }
    });
  }
  
  
    function updateAdmin(req, res) {
      //const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      var Ref = req.body.ref;
      Admin.findOne({ a_id: Ref }, function (err, doc) {
        var myquery = doc;
        var newvalues = { $set: req.body };
        Admin.updateOne(myquery, newvalues, function (err, obj) {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Admin updated"});
          }
        });
      });
    }

  // function updateAdmin(req, res) {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() })
  //   }
  //   var Ref = req.body.ref;
  //   Admin.findOne({ A_id: Ref }, function (err, doc) {
  //     var myquery = doc;
  //     var newvalues = { $set: req.body };
  //     Admin.updateOne(myquery, newvalues, function (err, obj) {
  //       if (err) {
  //         res.status(422).json({ msg: message.error.UNEXPRECTED_ERR, error });
  //         res.json(err);
  //       } else {
  //         res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
  //       }
  //     });
  //   });
  // }

  function deleteAdmin(req, res) {
    const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
      }
      var ref = req.body.ref;
      Admin.deleteOne({ A_id: ref }, function (err, obj) {
        if (err) {
              res.status(422).json({ msg: message.error.UNEXPRECTED_ERR, error });
              res.json(err);
          } else {
              res.json({ msg: message.SUCCESS.DOCUMENT_CREATED, obj: ntype });
          }
      });
  }
  module.exports = { updateAdmin, createAdmin, deleteAdmin };