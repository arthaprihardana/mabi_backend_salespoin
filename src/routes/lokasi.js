/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-29 21:52:35 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-30 00:07:46
 */
import express from 'express';
import Lokasi from '../class/Lokasi';
const router = express.Router();

router.route('/auth/lokasi')
    .post((req, res, next) => {
        let body = req.body;
        let setLokasi = new Lokasi(body);
        let response = setLokasi.createLokasi();
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
    .get((req, res, next) => {
        let query = req.query;
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let response = Lokasi.getLokasi(query);
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
        let lokasi = new Lokasi(body);
        let response = lokasi.updateLokasi(query);
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
    
router.route('/auth/lokasi/:_id')
    .get((req, res, next) => {
        let response = Lokasi.getLokasiById(req.params);
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
        let lokasi = new Lokasi(body);
        let response = lokasi.updateLokasi(params);
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

export default router;