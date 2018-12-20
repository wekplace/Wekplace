const pe = require('parse-error');
const {to} = require('await-to-js');

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if(err) return [pe(err)]; // this is returned in an array to standardize all the returns

    return [null, res];
};

module.exports.resToErr = function(res, err, code){ // Error Web Response
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json({success:false, error: err});
};

module.exports.resToSuccess = function(res, data, code){ // Success Web Response
    let send_data = {success:true};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data);
};

module.exports.throwError = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};

module.exports.getFilterFromQstr = (qStr) => {
    console.log(qStr);
    var arrStr = qStr.split(',');
    var objArrStr = arrStr.reduce((acc, cur) => {
        acc[cur.split(':')[0]] = cur.split(':')[1];
        return acc;
    }, {});
    return objArrStr;
}
// essentially getFilterFromQstr converts a query string to an object for example
// "firstName:Isaac,lastName:Tian" => {firstName: "Isaac", lastName: "Tian"}