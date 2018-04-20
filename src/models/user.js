/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 11:18:15 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-20 15:41:45
 */
import validasi from '../lib/validasi';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    tempatLahir: {
        type: String
    },
    tanggalLahir: {
        type: Date
    },
    alamat: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: [validasi.email, "Silahkan masukan alamat email dengan format yang valid"]
    },
    noHandphone: {
        type: String,
        required: true,
        validate: [validasi.phone, "Silahkan masukan no handphone dengan format yang valid"]
    },
    role: {
        type: String,
        enum: ["admin", "agen"],
        default: "admin",
        lowercase: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'area'
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    },
    senderId: {
        type: String
    }
}, { 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.path('nama').validate((val, cb) => {
    UserModel.find({ nama: val }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'Nama user telah terdaftar');
        } else {
            cb(true);
        }
    });
});

UserSchema.path('email').validate((val, cb) => {
    UserModel.find({ email: val }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'Email user telah terdaftar');
        } else {
            cb(true);
        }
    });
});

UserSchema.path('noHandphone').validate((val, cb) => {
    UserModel.find({ noHandphone: val }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'No Handphone user telah terdaftar');
        } else {
            cb(true);
        }
    });
});

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;