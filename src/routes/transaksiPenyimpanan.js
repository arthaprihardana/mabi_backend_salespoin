/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-30 07:49:17 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-30 08:09:27
 */
import express from 'express';
import TransaksiPenyimpanan from '../class/TransaksiPenyimpanan';
const router = express.Router();

router.route('/transaksi')
    .post((req, res, next) => {
        let body = req.body;
        let setTransaksi = new TransaksiPenyimpanan(body);
        let response = setTransaksi.createTransaksi();
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
        let response = TransaksiPenyimpanan.getTransaksi(query);
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
        let transaksi = new TransaksiPenyimpanan(body);
        let response = transaksi.updateTransaksi(query);
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

router.route('/transaksi/:_id')
    .get((req, res, next) => {
        let response = TransaksiPenyimpanan.getTransaksiById(req.params);
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
        let transaksi = new TransaksiPenyimpanan(body);
        let response = transaksi.updateTransaksi(params);
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