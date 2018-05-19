/**
 * @author: Artha Prihardana 
 * @Date: 2018-05-01 22:08:51 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 22:10:27
 */
import jwt from 'jsonwebtoken';

export default class TokenGenerator {

    constructor(secretOrPrivateKey, secretOrPublicKey, options) {
        this.secretOrPrivateKey = secretOrPrivateKey;
        this.secretOrPublicKey = secretOrPublicKey;
        this.options = options;
    }
    
    sign(payload, signOptions) {
        const jwtSignOptions = Object.assign({}, signOptions, this.options);
        return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    }

    refresh(token, refreshOptions) {
        const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
        const jwtSignOptions = Object.assign({ }, this.options, { jwtid: refreshOptions.jwtid });
        // The first signing converted all needed options into claims, they are already in the payload
        return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    }

}