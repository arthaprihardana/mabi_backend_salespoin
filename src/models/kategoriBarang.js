/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 11:36:04 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-18 11:42:22
 */
import mongoose from 'mongoose';

const KategoriBarangSchema = new mongoose.Schema({
    kategori: {
        type: String,
        required: true
    }
}, { 
    timestamps : {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

KategoriBarangSchema.path('kategori').validate((val, cb) => {
    KategoriBarangModel.find({ kategori: val }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'Nama kategori barang telah terdaftar');
        } else {
            cb(true);
        }
    });
});

const KategoriBarangModel = mongoose.model('kategoribarang', KategoriBarangSchema);
export default KategoriBarangModel;