// CREATE TABLE Product (
    
//     id_product  INT NOT NULL AUTO_INCREMENT,
//     name        VARCHAR(255),
    
//     id_model    INT,
//     id_color    INT ,
//     cost        decimal(15,2),
//     _date       timestamp,
//     discount    decimal(15,2),
    
//     inused      TINYINT, # Sản phẩm bị xóa thì inused = 0, chưa xóa thì inused = 1
//     active      TINYINT, # trong trang quản trị, sản phẩm muốn hiện trong trang người dùng thì active = 1, còn muốn ẩn thì active = 0.
    
//     created_at  VARCHAR(255),
//     updated_at  DATETIME ,

//     PRIMARY KEY (id_product)
// );
'use strict';
class Product{
   
    
    constructor(resBody){
        this.conDB = require('../app.js').conDB();
        this.name_table = "Product";

        this.id_product = resBody.id_product; 
        this.name       = resBody.name; 

        this.id_model   = resBody.id_model; 
        this.id_color   = resBody.id_color; 
        this.cost       = resBody.cost;
        this._date      = resBody._date;
        this.discount   = resBody.discount;

        this.inused     = resBody.inused; 
        this.active     = resBody.active; 

        this.created_at = resBody.created_at; 
        this.updated_at = resBody.updated_at; 
    }

    toJSON(){
        return {
            
            "id_product":   (this.id_product === undefined)?null:this.id_product,
            "name":         (this.name       === undefined)?null:this.name,

            "id_model":     (this.id_model   === undefined)?null:this.id_model,
            "id_color":     (this.id_color   === undefined)?null:this.id_color,
            "cost":         (this.cost       === undefined)?null:this.cost,
            "_date":        (this._date      === undefined)?null:this._date,
            "discount":     (this.discount   === undefined)?null:this.discount,

            "inused":       (this.inused     === undefined)?null:this.inused,
            "active":       (this.active     === undefined)?null:this.active,

            "created_at":   (this.created_at === undefined)?null:this.created_at,
            "updated_at":   (this.updated_at === undefined)?null:this.updated_at,
        }
    }


    hasInDB(callback) {
     
        var sql_query = `select * from ${this.name_table} where id_product=?`;
        var data_query = [this.id_product];

        this.conDB.query(sql_query, data_query, function(err, rows){
            if(err){
                callback(err, null);
            }else{
                callback(null, rows.length > 0)
            }
        });   
    }


    insertDB(callback){
        var sql_query = `Insert into ${this.name_table}
                ( name, id_model, id_color, cost, _date, discount, inused, active, created_at, updated_at)
         values(     ?,        ?,        ?,    ?,     ?,        ?,      ?,      ?,          ?,          ?)`;
        
        var data_query = [
            this.name, 
            this.id_model, this.id_color, this.cost, this._date, this.discount,
            this.inused, this.active, 
            this.created_at, this.updated_at
        ];

        this.conDB.query(sql_query, data_query, callback);   
    }

    getAllDB(callback){
        var sql_query = `SELECT * FROM ${this.name_table} WHERE 1=1`;
        
        var data_query = [];

        this.conDB.query(sql_query, data_query, callback);   
    }


    ///////// Action //////

    getAll(callback){
        this.getAllDB(function(err, result, fields){
            callback(err, result)
        })
    }
}


module.exports = Product;