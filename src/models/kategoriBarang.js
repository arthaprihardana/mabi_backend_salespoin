/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 11:36:04 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:23:19
 */
import mongoose from 'mongoose';

const KategoriBarangSchema = new mongoose.Schema({
    kategori: {
        type: String,
        required: [true, 'Kategori barang harus diisi'],
        lowercase: true,
        validate: {
            validator: async (val) => {
                try {
                    let qry = await KategoriBarangModel.find({ kategori: val }).exec();
                    return (qry.length == 0);
                } catch (error) {
                    return false;
                }
            },
            message: 'Nama kategori barang {VALUE} telah terdaftar'
        }
    }
}, { 
    timestamps : {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const KategoriBarangModel = mongoose.model('kategoribarang', KategoriBarangSchema);
export default KategoriBarangModel;