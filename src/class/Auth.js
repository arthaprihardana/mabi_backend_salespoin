/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-21 14:05:19 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-21 14:33:39
 */
import config from '../app.conf';
import jwt from 'jsonwebtoken';
import bCrypt from 'bcrypt-nodejs';

export default class Auth {
    
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    createHash() {
        return bCrypt.hashSync(this.password, bCrypt.genSaltSync(10), null);
    }

    get hash() {
        return this.createHash();
    }

    static compareSync(passwordFromDb) {
        return bCrypt.compareSync(this.password, passwordFromDb);
    }

    static decode(token) {
        return jwt.decode(token, config.SECRET_KEY);
    }

    generateToken() {
        let setExpired = (num) => {
            let date = new Date();
            this.expired = date.setMinutes(date.getMinutes() + num);
            return this.expired;
        }

        let expires = setExpired(720);
        let token = jwt.encode({
            exp: expires
        }, config.SECRET_KEY);
        return {
            token: token,
            expires: expires
        };
    }

}