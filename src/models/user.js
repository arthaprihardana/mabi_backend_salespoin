/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 11:18:15 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 20:13:04
 */
import validasi from '../lib/validasi';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Nama user harus diisi'],
        validate: {
            validator: async (val) => {
                try {
                    let qry = await UserModel.find({ nama: val }).exec();
                    return(qry.length == 0);
                } catch (error) {
                    return false;
                }
            },
            message: 'Nama user {VALUE} telah terdaftar'
        }
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
        required: true,
        validate: [{
                validator: validasi.email,
                message: 'Silahkan masukan alamat email dengan format yang valid'
            },{
                validator: async (val) => {
                    try {
                        let qry = await UserModel.find({ email: val }).exec();
                        return(qry.length == 0);
                    } catch (error) {
                        return false;
                    }
                },
                message: 'Email user {VALUE} telah terdaftar'
            }
        ]
        // validate: [validasi.email, "Silahkan masukan alamat email dengan format yang valid"]
    },
    noHandphone: {
        type: String,
        required: [true, 'No telepon user harus diisi'],
        validate: [{
            validator: validasi.phone,
            message: 'Silahkan masukan no handphone dengan format yang valid'
        }, {
            validator: async (val) => {
                try {
                    let qry = await UserModel.find({ noHandphone: val }).exec();
                    return(qry.length == 0);
                } catch (error) {
                    return false;
                }
            },
            message: 'No Handphone user {VALUE} telah terdaftar'
        }]
        // validate: [validasi.phone, "Silahkan masukan no handphone dengan format yang valid"]
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
        required: [true, 'Username harus diisi']
    },
    password: {
        type: String,
        required: [true, 'password harus diisi']
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

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;