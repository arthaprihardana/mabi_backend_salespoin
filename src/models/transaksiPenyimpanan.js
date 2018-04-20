/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-20 15:44:48 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-20 15:58:39
 */
import mongoose from 'mongoose';

const TransaksiPenyimpananSchema = new mongoose.Schema({
    kategoriBarang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kategoribarang'
    },
    lokasi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lokasi'
    },
    statusTransaksi: {
        type: String
    },
    tanggalTransksi: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const TransaksiPenyimpananModel = mongoose.model('transaksipenyimpanan', TransaksiPenyimpananSchema);
export default TransaksiPenyimpananModel;