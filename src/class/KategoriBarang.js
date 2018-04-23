/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-22 14:18:13 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:36:46
 */
import KategoriBarangModel from '../models/kategoriBarang';
import ObjectManipulation from './ObjectManipulation';

export default class KategoriBarang {

    constructor(body) {
        this.body = body;
        this.kategori = body.kategori;
    }

    createKategori() {
        const kategoriModel = new KategoriBarangModel();
        kategoriModel.kategori = this.kategori;
        let simpan = kategoriModel.save();
        return simpan;
    }

    updateKategori(query) {
        let update = KategoriBarangModel.update({ _id: query._id }, this.body, {}).exec();
        return update;
    }

    static getKategori(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let search = { kategori: new RegExp(query.search, "i") };
        let qry = queryObject.filter();
        let find = {};
        if(query.search) {
            find = search;
        } else if(query.all) {
            limitPerPage = 0;
        } else {
            find = {
                $and: [
                    qry||{}
                ]
            };
        }
        let getData = KategoriBarangModel.find(find).limit(limitPerPage).skip(limitPerPage * (page - 1)).exec();
        let dataCount = KategoriBarangModel.count(find).exec();
        return [getData, dataCount];
    }

    static getKategoriById(params) {
        let getData = KategoriBarangModel.findOne({ _id: params._id }).exec();
        return getData;
    }

}