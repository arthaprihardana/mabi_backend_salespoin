/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 15:59:25 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 20:19:08
 */
import express from 'express';
import User from '../class/User';
const router = express.Router();

router.route('/user')
    .post((req, res, next) => {})
    .get((req, res, next) => {})
    .put((req, res, next) => {});

router.route('/user/:_id')
    .get((req, res, next) => {

    })
    .put((req, res, next) => {});

export default router;
