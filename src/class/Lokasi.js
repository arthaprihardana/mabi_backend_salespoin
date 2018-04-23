/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-22 19:53:59 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 20:04:37
 */
import LokasiModel from '../models/lokasi';
import ObjectManipulation from './ObjectManipulation';

export default class Lokasi {

    constructor(body) {
        this.body = body;
        this.namaLokasi = body.namaLokasi;
        this.alamat = body.alamat;
        this.gmaps = body.gmaps;
    }

    createLokasi() {
        const lokasiModel = new LokasiModel();
        lokasiModel.namaLokasi = this.namaLokasi;
        lokasiModel.alamat = this.alamat;
        lokasiModel.gmaps = this.gmaps;
        let simpan = lokasiModel.save();
        return simpan;
    }

    updateLokasi(query) {
        let update = lokasiModel.update({ _id: query._id }, this.body, {}).exec();
        return update;
    }

    deleteLokasi(query) {

    }

    static getLokasi(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let search = {
            
        }
        let qry = queryObject.filter();
        let find = {};
        if(query.search) {
            find = search
        } else if (query.all) {
            limitPerPage = 0
        } else {
            find = {
                $and: [
                    qry||{}
                ]
            }
        }
        let getData = LokasiModel.find(find).limit(limitPerPage).skip(limitPerPage * ( page - 1 )).exec();
        let dataCount = LokasiModel.count(find).exec();
        return [getData, dataCount];
    }

    static getLokasiById(params) {
        let getData = LokasiModel.findOne({_id: params._id}).exec();
        return getData;
    }

}