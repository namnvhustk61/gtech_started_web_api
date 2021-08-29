// Strings.js

var Strings={
    KEY_HASH: "namstork",
    // ERROR MESSAGE
    E_001_MESS:"Content-Type must be application/json",

    E_010_MESS: function(field_name){return `${field_name} field require not null`}, // field null
    E_015_MESS: function(valueType){return `${valueType} is validate faild!`},


    E_500_MESS: "Error: Connect to Server Faild!", // server faild

    E_100_MESS: "Error: Database already exist!",  // err exist
    E_101_MESS: "Error: Database Create!",  // err create

    ADD_SUCCESS: "Successfully",

}

module.exports = Strings;