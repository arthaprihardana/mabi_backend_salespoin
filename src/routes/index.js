/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:24:58 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-30 07:53:26
 */
import express from 'express';
import mongoose from 'mongoose';
import config from '../app.conf';

import Area from './area';
import KategoriBarang from './kategoriBarang';
import User from './user';
import Lokasi from './lokasi';
import Transaksi from './transaksiPenyimpanan';

const router = express.Router();

/* GET info page. */
router.get('/', (req, res, next) => {
	res.send({
		status: true,
		statusCode: res.statusCode,
		message: "Request Berhasil",
		data: {
			apiName: "REST API MABI SALES POIN",
			apiVersion: "0.0.1",
			apiDescription: "Api ini dibuat untuk kebutuhan aplikasi sales poin milik Mabi Foundation"
		}
  	});
});

router.get('/testConnection', (req, res, next) => {
	mongoose.connect(config.DATABASE, config.DB_AUTH, (error) => {
		if(error) {
			res.send({
				error: error
			})
		} else {
			res.send({
				message: "DB CONNECTED"
			})
		}
		// Check error in initial connection. There is no 2nd param to the callback.
	});
})

router.use('/', Area);
router.use('/', KategoriBarang);
router.use('/', User);
router.use('/', Lokasi);
router.use('/', Transaksi);

export default router;
