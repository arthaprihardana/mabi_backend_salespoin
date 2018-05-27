/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-22 14:37:47 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:40:25
 */
import express from 'express';
import KategoriBarang from '../class/KategoriBarang';
const router = express.Router();

router.route('/auth/kategoribarang')
    .post((req, res, next) => {
        let body = req.body;
        let setKategori = new KategoriBarang(body);
        let response = setKategori.createKategori();
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
        let response = KategoriBarang.getKategori(query);
        let getData = response[0];
        let countData = response[1];
        getData
            .then(response => {
                return [response, countData];
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
        let kategori = new KategoriBarang(body);
        let response = kategori.updateKategori(query);
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

router.route('/auth/kategoribarang/:_id')
    .get((req, res, next) => {
        let response = KategoriBarang.getKategoriById(req.params);
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
        let kategori = new KategoriBarang(body);
        let response = kategori.updateKategori(params);
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