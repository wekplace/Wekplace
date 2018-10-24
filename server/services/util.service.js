const pe = require('parse-error');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

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


// Theoretical features
// module.exports.getJWTUtil = function(_id, email, secret, jwtExpTime) {
//     const getJWT = function () {
//         const token = jwt.sign({
//             email: email,
//             UserId: _id
//         }, secret, {
//             expiresIn: jwtExpTime || CONFIG.jwt_expiration
//         });
//         console.log(email);
//         return token;
//     }

//     return getJWT;
// };

// module.exports.saveHookUtil = function(context) {
//     const saveHook =  async function(next){
//         if (context.isModified('password') || context.isNew) {
    
//             let err, salt, hash;
//             [err, salt] = await to(bcrypt.genSalt(10));
//             if (err) throwError(err.message, true);
    
//             [err, hash] = await to(bcrypt.hash(context.password, salt));
//             if (err) throwError(err.message, true);
    
//             context.password = hash;
//         }
//     }
//     return saveHook;
// }