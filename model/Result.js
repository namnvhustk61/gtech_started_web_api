// Result.js

var Result = {

    create:function(code, message, data){
        return {
            "code" : code,
            
            "message" : message,
            "data" : data,
        };
    },
    // status
    
    // code
    OK:"OK", 

    E_001:"E_001", // header content_type != application/json
    
    E_010:"E_010", // field is require
    E_015:"E_015", // validate 

    E_500:"E_500", // err connect server

    E_100:"E_100",  // err Database already exist
    E_101: "E_101", // err Database create 

}

module.exports = Result;