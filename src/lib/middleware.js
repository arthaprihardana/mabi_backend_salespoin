/**
 * @author: Artha Prihardana 
 * @Date: 2018-05-01 12:44:14 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 21:55:30
 */
import config from '../app.conf';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    let Authorization = req.headers['authorization'];
    if(Authorization) {
        try {
            let verify = jwt.verify(Authorization, config.SECRET_KEY);
            if(verify.iat <= Date.now()) {
                res.status(400);
                res.send({
                    status: false,
                    statusCode: res.statusCode,
                    options: {},
                    errMessage: 'Authorization telah kedaluarsa'
                });
                return;
            }
            next();
        } catch (error) {
            res.status(500);
            res.send({
                status: false,
                statusCode: res.statusCode,
                options: {},
                errMessage: 'Authorization tidak valid'
            });
        }
    } else {
        res.status(401);
        res.send({
            status: false,
            statusCode: res.statusCode,
            options: {},
            errMessage: 'Authorization tidak valid'
        });
    }
}