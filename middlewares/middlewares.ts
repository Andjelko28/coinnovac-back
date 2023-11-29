import {expressjwt} from 'express-jwt';

const authMiddleware = expressjwt({
    secret: 'SECRET',
    algorithms: ['ES256'],
    requestProperty: 'userData'
})

export default authMiddleware;