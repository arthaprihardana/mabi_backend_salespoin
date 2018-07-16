/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-30 07:34:39 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-30 08:10:34
 */
import TransaksiPenyimpananModel from '../models/transaksiPenyimpanan';
import ObjectManipulation from './ObjectManipulation';

export default class TransaksiPenyimpanan {
    
    constructor(body) {
        this.body = body;
        this.kategoriBarang = body.kategoriBarang;
        this.lokasi = body.lokasi;
        this.statusTransaksi = body.statusTransaksi;
        this.namaAgen = body.namaAgen;
    }

    createTransaksi() {
        const transaksiModel = new TransaksiPenyimpananModel();
        transaksiModel.kategoriBarang = this.kategoriBarang;
        transaksiModel.lokasi = this.lokasi;
        transaksiModel.statusTransaksi = this.statusTransaksi;
        transaksiModel.namaAgen = this.namaAgen;
        let simpan = transaksiModel.save();
        return simpan;
    }
    
    updateTransaksi(query) {
        let update = TransaksiPenyimpananModel.update({ _id : query._id }, this.body, {}).exec();
        return update;
    }

    static getTransaksi(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let qry = queryObject.filter();
        let find = {};
        if(query.all) {
            limitPerPage = 0;
        } else {
            find = {
                $and: [
                    qry||{}
                ]
            };
        }
        let getData = TransaksiPenyimpananModel
                        .find(find)
                        .populate({ path: 'kategoriBarang', select: 'kategori' })
                        .populate({ path: 'lokasi', populate: ({ path: 'agen', select: ['nama', 'noHandphone', 'email'] }) })
                        .populate({ path: 'namaAgen', select: ['nama', 'email', 'noHandphone', 'senderId'] })
                        .limit(limitPerPage).skip(limitPerPage * (page - 1)).exec();
        let dataCount = TransaksiPenyimpananModel.count(find).exec();
        return [getData, dataCount];
    }

    static getTransaksiById(params) {
        let getData = TransaksiPenyimpananModel.findOne({ _id: params._id }).populate({ path: 'kategoriBarang', select: 'kategori' }).populate({ path: 'lokasi', populate: ({ path: 'agen', select: ['nama', 'noHandphone', 'email'] }) }).exec();
        return getData;
    }

}