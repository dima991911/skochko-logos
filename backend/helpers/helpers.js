const { jwt } = require('../config/index');
const jsonwebtoken = require('jsonwebtoken');

const isTokenCorrect = (token) => {
    return jsonwebtoken.verify(token, jwt.secret, (err, decoded) => {
        if (!err) {
            return true;
        }
        return false;
    });
};

module.exports.isTokenCorrect = isTokenCorrect;
