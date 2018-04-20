/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 14:33:06 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-20 14:36:09
 */
import mongoose from 'mongoose';

const AreaSchema = new mongoose.Schema({
    namaArea: {
        type: String,
        required: true,
        lowercase: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

AreaSchema.path('namaArea').validate((val, cb) => {
    AreaModel.find({ namaArea: val }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'Nama area telah terdaftar');
        } else {
            cb(true);
        }
    })
});

const AreaModel = mongoose.model('area', AreaSchema);
export default AreaSchema;