/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 14:33:06 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 14:14:40
 */
import mongoose from 'mongoose';

const AreaSchema = new mongoose.Schema({
    namaArea: {
        type: String,
        required: [true, 'Nama area harus diisi'],
        lowercase: true,
        validate: {
            validator: async (val) => {
                try {
                    let qry = await AreaModel.find({ namaArea: val }).exec();
                    return (qry.length == 0);
                } catch (error) {
                    return false;
                }
            },
            message: 'Nama area {VALUE} telah terdaftar'
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const AreaModel = mongoose.model('area', AreaSchema);
export default AreaModel;