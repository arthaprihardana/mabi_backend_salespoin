/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 15:59:25 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 21:43:38
 */
import express from 'express';
import nodemailer from 'nodemailer';
import User from '../class/User';
import config from '../app.conf';
import emailTemplate from '../lib/emailTemplate';
import Auth from '../class/Auth';
const router = express.Router();

router.route('/register')
    .post((req, res, next) => {
        let body = req.body;
        let setUser = new User(body);
        let createUser = setUser.createUser();
        let response = createUser[0];
        let info = createUser[1];
        response
            .then(response => {
                console.log('info ==>', info);
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                let transporter = nodemailer.createTransport(config.SMTP_CONFIG);
                let mailOption = {
                    from: '"Admin Sales Poin " <arthaprihardana@gmail.com>',
                    to: response.email,
                    subject: 'Username dan Password Agen',
                    text: 'Username dan Password Agen', 
                    html: emailTemplate.template(info)
                }
                transporter.sendMail(mailOption, (error, info) => {
                    if(error) {
                        console.log('error mail ==>', error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: {},
                    data: response
                });
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    })

router.route('/auth/user')
    .post((req, res, next) => {
        let body = req.body;
        let setUser = new User(body);
        let createUser = setUser.createUser();
        let response = createUser[0];
        let info = createUser[1];
        response
            .then(response => {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                let transporter = nodemailer.createTransport(config.SMTP_CONFIG);
                let mailOption = {
                    from: '"Admin Sales Poin " <arthaprihardana@gmail.com>',
                    to: response.email,
                    subject: 'Username dan Password Agen',
                    text: 'Username dan Password Agen', 
                    html: emailTemplate.template(info)
                }
                transporter.sendMail(mailOption, (error, info) => {
                    if(error) {
                        console.log('error mail ==>', error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: {},
                    data: response
                });
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    })
    .get((req, res, next) => {
        let query = req.query;
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let response = User.getUser(query);
        let getData = response[0];
        let countData = response[1];
        getData
            .then(response => {
                return [response, countData] 
            })
            .spread((response, dataCount) => {
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: {
                        total: dataCount,
                        limit: limitPerPage,
                        page: page,
                        pages: Math.ceil(dataCount / limitPerPage)
                    },
                    data: response
                });
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    })
    .put((req, res, next) => {
        let body = req.body;
        let query = req.query;
        let user = new User(body);
        let response = user.updateUser(query);
        response
            .then(response => {
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: response,
                    data: body
                })
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    });

router.route('/user/:_id')
    .get((req, res, next) => {
        let response = User.getUserById(req.params);
        response
            .then(response => {
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: {},
                    data: response
                });
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    })
    .put((req, res, next) => {
        let body = req.body;
        let params = req.params;
        let user = new User(body);
        let response = user.updateUser(params);
        response
            .then(response => {
                res.send({
                    status: true,
                    statusCode: res.statusCode,
                    options: response,
                    data: body
                })
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    });

router.route('/login')
    .post((req, res, next) => {
        let body = req.body;
        let login = User.login({username: body.username, password: body.password});
        login
            .then(response => {
                if(response.status) {
                    let auth = new Auth(body.username, body.password);
                    let passwordValidate = auth.compareSync(response.password);
                    if(passwordValidate) {
                        let token = auth.generateToken();
                        let user = new User({token: token.token});
                        let updateUser = user.updateUser({_id: response._id });
                        res.send({
                            status: true,
                            statusCode: res.statusCode,
                            options: token,
                            data: {
                                nama: response.nama,
                                username: response.username,
                                email: response.email,
                                noHandphone: response.noHandphone,
                                role: response.role,
                                area: response.role == "agen" ? response.area.namaArea : "",
                            }
                        });
                    } else {
                        res.send({
                            status: false,
                            statusCode: res.statusCode,
                            options: {},
                            errMessage: "Password yang anda masukan salah"
                        });
                    }
                } else {
                    res.send({
                        status: false,
                        statusCode: res.statusCode,
                        options: {},
                        errMessage: "Username yang anda masukan salah"
                    });
                }
            })
            .catch(err => {
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: err.message
                });
            });
    });

router.route('/auth/logout')
    .get((req, res, next) => {
        let exp = Auth.expired(req.headers['authorization']);
        if(exp) {
            res.send({
                status: true,
                statusCode: res.statusCode,
                options: {},
                message: "Logout berhasil, Silahkan login kembali untuk mengakses aplikasi.",
                data: {}
            });
        } else {
            res.send({
                status: false,
                statusCode: res.statusCode,
                options: {},
                errMessage: "Terjadi kesalahan pada saat logout."
            });
        }
    });

export default router;
