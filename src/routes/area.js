/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-21 14:47:10 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:08:58
 */
import express from 'express';
import Area from '../class/Area';
import cors from 'cors';
const router = express.Router();

router.route('/auth/area')
    .post((req, res, next) => {
        let body = req.body;
        let setArea = new Area(body);
        let response = setArea.createArea();
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
        let response = Area.getArea(query);
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
        let area = new Area(body);
        let response = area.updateArea(query);
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

router.route('/auth/area/:_id')
    .get((req, res, next) => {
        let response = Area.getAreaById(req.params);
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
        let area = new Area(body);
        let response = area.updateArea(params);
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