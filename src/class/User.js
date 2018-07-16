/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 16:00:22 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 21:20:20
 */

import moment from 'moment';
require('moment/locale/id');
import UserModel from '../models/user';
import Auth from './Auth';
import ObjectManipulation from './ObjectManipulation';

export default class User {
    
    constructor(body) {
        this.body = body;
        this.nama = body.nama || null;
        this.tempatLahir = body.tempatLahir || null;
        this.tanggalLahir = body.tanggalLahir || null;
        this.alamat = body.alamat || null;
        this.email = body.email || null;
        this.noHandphone = body.noHandphone || null;
        this.role = body.role || null;
        this.area = body.area || null;
        this.username = body.nama != undefined ? Auth.generateUsername(body.nama) : null;
        this.password = body.nama != undefined ? Auth.generatePassword() : null;
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
        userModel.password = generatePassword.createHash();
        userModel.show = this.show;
        userModel.token = this.token;
        userModel.senderId = this.senderId;

        let simpan = userModel.save();
        return [simpan, { username : this.username, password: this.password}];
    }

    updateUser(query) {
        let update = UserModel.update({ _id : query._id }, this.body, {}).exec();
        return update;
    }

    deleteUser() {
        
    }

    static getUser(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let search = {
            $or: [{
                    nama: new RegExp(query.search, "i")
                }, {
                    tempatLahir: new RegExp(query.search, "i"),
                }, {
                    alamat: new RegExp(query.search, "i"),
                }, {
                    email: new RegExp(query.search, "i"),
                }, {
                    noHandphone: new RegExp(query.search, "i"),
                }, {
                    username: new RegExp(query.search, "i")
                }]
        };
        let qry = queryObject.filter();
        let find = {};
        if(query.search) {
            find = search;
        } else if (query.all) {
            limitPerPage = 0;
        } else {
            find = {
                $and: [
                    qry||{}
                ]
            };
        }
        let getData = UserModel.find(find).populate({ path: 'area', select: 'namaArea' }).limit(limitPerPage).skip(limitPerPage * (page - 1)).exec();
        let dataCount = UserModel.count(find).exec();
        return [getData, dataCount];
    }

    static getUserById(params) {
        let getData = UserModel.findOne({ _id: params._id }).populate({ path: 'area', select: 'namaArea' }).exec();
        return getData;
    }

    static login(data) {
        let username = data.username;
        let password = data.password;
        let role = data.role;
        let find = UserModel.findOne({
            $and: [{
                $or: [{
                    username: username
                }, {
                    email: username
                }, {
                    nama: username
                }],
                role: role,
                show: true
            }]
        }).populate({path: 'area', select: 'namaArea'}).exec();
        return find;
    }
}