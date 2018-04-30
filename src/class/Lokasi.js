/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-22 19:53:59 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-30 08:11:53
 */
import LokasiModel from '../models/lokasi';
import ObjectManipulation from './ObjectManipulation';

export default class Lokasi {

    constructor(body) {
        this.body = body;
        this.namaLokasi = body.namaLokasi || null;
        this.alamat = body.alamat || null;
        this.gmaps = body.gmaps || null;
        this.agen = body.agen || null;
    }

    createLokasi() {
        const lokasiModel = new LokasiModel();
        lokasiModel.namaLokasi = this.namaLokasi;
        lokasiModel.alamat = this.alamat;
        lokasiModel.gmaps = {
            id: this.gmaps.id,
            name: this.gmaps.name,
            premise: this.gmaps.premise,
            route: this.gmaps.route,
            location: this.gmaps.location.split(",").map(Number),
            administrative_area_level_1: this.gmaps.administrative_area_level_1,
            administrative_area_level_2: this.gmaps.administrative_area_level_2,
            administrative_area_level_3: this.gmaps.administrative_area_level_3,
            administrative_area_level_4: this.gmaps.administrative_area_level_4,
            street_number: this.gmaps.street_number,
            country: this.gmaps.country,
            postal_code: this.gmaps.postal_code,
            formatted_address: this.gmaps.formatted_address,
            countryCode: this.gmaps.countryCode,
            locale: this.gmaps.locale
        };
        lokasiModel.agen = this.agen;
        let simpan = lokasiModel.save();
        return simpan;
    }

    updateLokasi(query) {
        let update = LokasiModel.update({ _id: query._id }, this.body, {}).exec();
        return update;
    }

    deleteLokasi(query) {

    }

    static getLokasi(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let search = {
            $or: [{
                    namaLokasi: new RegExp(query.search, "i"),
                }, {
                    alamat: new RegExp(query.search, "i"),
                }, {
                    "gmaps.name": new RegExp(query.search, "i")
                }]
        };
        let qry = queryObject.filter();
        let find = {};
        if(query.search) {
            find = search;
        } else if (query.all) {
            limitPerPage = 0
        } else {
            find = {
                $and: [
                    qry||{}
                ]
            };
        }
        let getData = LokasiModel.find(find).populate({ path: 'agen', select: 'nama'}).limit(limitPerPage).skip(limitPerPage * ( page - 1 )).exec();
        let dataCount = LokasiModel.count(find).populate({ path: 'agen', select: 'nama'}).exec();
        return [getData, dataCount];
    }

    static getLokasiById(params) {
        let getData = LokasiModel.findOne({_id: params._id}).exec();
        return getData;
    }

}