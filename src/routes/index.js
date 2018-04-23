/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:24:58 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-21 14:51:59
 */
import express from 'express';

import Area from './area';
import KategoriBarang from './kategoriBarang';

const router = express.Router();

/* GET info page. */
router.get('/', function (req, res, next) {
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

router.use('/', Area);
router.use('/', KategoriBarang);

export default router;
