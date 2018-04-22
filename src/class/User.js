/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 16:00:22 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-21 14:39:04
 */

import UserModel from '../models/user';
import Auth from './Auth';

class User extends Auth {
    
    constructor(body) {
        this.nama = body.nama || null;
        this.tempatLahir = body.tempatLahir || null;
        this.tanggalLahir = body.tanggalLahir || null;
        this.alamat = body.alamat || null;
        this.email = body.email || null;
        this.noHandphone = body.noHandphone || null;
        this.role = body.role || null;
        this.area = body.area || null;
        this.username = body.username || null;
        this.password = body.password || null;
        this.show = body.show || null;
        this.token = body.token || null;
        this.senderId = body.senderId || null;
    }

    createUser() {
        const userModel = new UserModel();
        const generatePassword = new Auth(this.username, this.password);

        userModel.nama = this.nama;
        userModel.tempatLahir = this.tempatLahir;
        userModel.tanggalLahir = this.tanggalLahir;
        userModel.alamat = this.alamat;
        userModel.email = this.email;
        userModel.noHandphone = this.noHandphone;
        userModel.role = this.role;
        userModel.area = this.area;
        userModel.username = this.username;
        userModel.password = generatePassword;
        userModel.show = this.show;
        userModel.token = this.token;
        userModel.senderId = this.senderId;
    }

    updateUser() {

    }

    deleteUser() {
        
    }

    getUser() {

    }

}