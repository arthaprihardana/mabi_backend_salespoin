/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-21 14:39:20 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:07:31
 */
import AreaModel from '../models/area';
import ObjectManipulation from './ObjectManipulation';

export default class Area {

    constructor(body) {
        this.body = body;
        this.namaArea = body.namaArea;
    }

    createArea() {
        let areaModel = new AreaModel();
        areaModel.namaArea = this.namaArea;
        let simpan = areaModel.save();
        return simpan;
    }
    
    updateArea(query) {
        let update = AreaModel.update({ _id : query._id }, this.body, {}).exec();
        return update;
    }

    static getArea(query) {
        let queryObject = new ObjectManipulation(query, ['limit', 'page']);
        let limitPerPage = parseInt(query.limit) || 25;
        let page = parseInt(query.page) || 1;
        let search = { namaArea: new RegExp(query.search, "i") }
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
        let getData = AreaModel.find(find).limit(limitPerPage).skip(limitPerPage * ( page - 1 )).exec();
        let dataCount = AreaModel.count(find).exec();
        return [getData, dataCount];
    }

    static getAreaById(params) {
        let getData = AreaModel.findOne({_id: params._id }).exec();
        return getData;
    }

}