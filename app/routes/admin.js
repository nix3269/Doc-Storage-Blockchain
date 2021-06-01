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
   
  // function getAdmin(req) {
  //   let query = Admin.find(req.body);
  //   query.exec((err, doc) => {
  //     if (err){
  //       console.log("Error error error error")
  //       return;

  //     } 
  //     if (doc){
  //       return doc;
  //     }else{
  //       console.log("Error error error error")
  //       return ;
  //     }
  //   });
  // }
  
  function createAdmin(req, res) {
    obj = {a_name: req.query.a_name,a_pass:req.query.a_pass }
    var newB = new Admin(obj)
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
    function getAdmin(req, res) {
      let query = {};
      if (req.body.a_name && req.body.a_pass) {
        query = req.body;
        Admin.findOne(query, (err, x) => {
          if (err) {
            res.render('admin1',{ message: "Error occured"});
          }else{
          if (!x) {
            res.render('admin1',{ message: "Wrong Credentials" });
          }else{
          res.render('admin2',{doc : x.publickey});
          }
        }
        });
      } else {
        res.render('admin1',{ message: "Wrong Credentials" })
      }
      
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
  module.exports = { updateAdmin, createAdmin, deleteAdmin ,getAdmin};