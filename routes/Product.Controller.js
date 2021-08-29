var express = require('express');
var router = express.Router();

const Result = require("../model/Result.js");
const Strings = require("../bin/Strings.js");
const Product = require('../model/Product.Model.js');

/* GET home page. */
router.get('/all', function(req, res, next) {
  var _product = new Product({});

  _product.getAll(function(err, results){
    if(err){
      res.json(Result.create(Result.E_500, Strings.E_500_MESS + err, null));
  }else{
      var data = (results.length == 0)?null:[];
      for (var i = 0;i < results.length; i++) {
        _product = new Product(results[i]);
          data.push(_product.toJSON());
      }
      res.json(Result.create(Result.OK, Strings.OK_LOGIN, data));
  }
  })
});


/** ADD  */
router.post('/add',  function(req, res, next){
  /** Check Not null */
  if(!req.body.name){res.json(Result.create(Result.E_010, Strings.E_010_MESS("name"), null)); return;}

  if(!req.body.id_model){res.json(Result.create(Result.E_010, Strings.E_010_MESS("id_model"), null)); return;}
  if(!req.body.id_color){res.json(Result.create(Result.E_010, Strings.E_010_MESS("id_color"), null)); return;}
  if(!req.body.cost){res.json(Result.create(Result.E_010, Strings.E_010_MESS("cost"), null));  return;}
  if(!req.body._date){res.json(Result.create(Result.E_010, Strings.E_010_MESS("_date"), null));  return;}
  if(!req.body.discount){res.json(Result.create(Result.E_010, Strings.E_010_MESS("discount"), null));  return;}

  if(!req.body.inused){res.json(Result.create(Result.E_010, Strings.E_010_MESS("inused"), null));  return;}
  if(!req.body.active){res.json(Result.create(Result.E_010, Strings.E_010_MESS("active"), null));  return;}

  
  var _product = new Product(req.body);
  _product.created_at = new Date();
  _product.updated_at = new Date();
  // _product._date = new Date();

  _product.hasInDB(function(err, bool, itemInDB){
    if(err){
       /** Err return E_500*/
      res.json(Result.create(Result.E_100, Strings.E_100_MESS + err, null));
    }else{
       /** */

       _product.insertDB(function(err, row){
        /** Insert Table  */
        if(err){
          /** ERR */
          res.json(Result.create(Result.E_101, Strings.E_101_MESS + err, null));
        }else{
          /** */
          res.json(Result.create(Result.OK, Strings.ADD_SUCCESS, _product.toJSON()));
        }
     })

    }
  })
});



module.exports = router;
