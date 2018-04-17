/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:24:58 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-18 00:55:39
 */
import express from 'express';

const router = express.Router();

/* GET home page. */
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

export default router;
