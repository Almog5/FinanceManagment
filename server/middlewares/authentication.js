const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const token = authHeader.split(' ')[1]

    try{
        const dencoded = jwt.verify(token, process.env.JWT_SECRET)
        const { userID, name, accountID} = decoded;

        req.user = { userID, name };
        req.account = { accountID };
        next()
    } catch (err) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
}

module.exports = authenticationMiddleware;