/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-21 14:05:19 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 22:37:00
 */
import config from '../app.conf';
import jwt from 'jsonwebtoken';
import bCrypt from 'bcrypt-nodejs';
import TokenGenerator from '../lib/tokenGenerator';

export default class Auth {
    
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    createHash() {
        return bCrypt.hashSync(this.password, bCrypt.genSaltSync(10), null);
    }
    
    compareSync(passwordFromDb) {
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
        let token = jwt.sign({
            username: this.username,
            password: this.password,
            iat: expires
        }, config.SECRET_KEY);
        return {
            token: token,
            expires: expires
        };
    }

    static generateUsername(name) {
        let str = name.split(" ")[0].toLowerCase();
        let num = Math.floor(Math.random() * 999);
        let username = str + num
        return username.toString();
    }

    static generatePassword() {
        let num = "0123456789";
        let cnt = 0;
        let pwd = "";
		for( let i=0; i < 5; i++ ) {
            cnt++;
            pwd += num.charAt(Math.floor(Math.random() * num.length));
            if(cnt == 5) {
                return pwd;
            }
        }
    }

    static expired(token) {
        // let exp = jwt.decode(token, {complete: true});
        // let exp = jwt.verify(token, config.SECRET_KEY, {
        //     ignoreExpiration: true
        // })
        // console.log(exp);

        // const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '2m', notBefore: '2s' })
        // token = tokenGenerator.sign({ myclaim: 'something' }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })
        // setTimeout(function () {
        //     let token2 = tokenGenerator.refresh(token, { verify: { audience: 'myaud', issuer: 'myissuer' }, jwtid: '2' })
        //     console.log('token 1 ==> ', token);
        //     console.log('token 2 ==> ', token2);
            
        //     console.log('1==>', jwt.decode(token, { complete: true }))
        //     console.log('2==>', jwt.decode(token2, { complete: true }))
        // }, 3000)
        
        return true;
    }

}