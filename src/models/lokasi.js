/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 13:33:42 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-20 15:35:31
 */
import mongoose from 'mongoose';
import config from '../app.conf';

const LokasiSchema = new mongoose.Schema({
    namaLokasi: {
        type: String,
        required: true,
    },
    alamat: {
        type: String
    },
    gmaps: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        premise: {
            type: String
        },
        route: {
            type: String
        },
        location: {
            type: [Number],
            index: '2dsphere'
        },
        administrative_area_level_1: {
            type: String
        },
        administrative_area_level_2: {
            type: String
        },
        administrative_area_level_3: {
            type: String
        },
        administrative_area_level_4: {
            type: String
        },
        street_number: {
            type: String
        },
        country: {
            type: String
        },
        postal_code: {
            type: String
        },
        formatted_address: {
            type: String
        },
        countryCode: {
            type: String
        },
        locale: {
            type: String
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

LokasiSchema.path('gmaps.location').validate(( val, cb ) => {
    LokasiModel.find({
        'gmaps.location': {
            $geoWithin: {
                $centerSphere: [ val.split(',').map(Number), parseFloat(config.RADIUS)/parseFloat(config.EARTH_RADIUS) ]
            }
        }
    }, (err, docs) => {
        if(docs.length > 0) {
            cb(false, 'Lokasi dengan radius tersebut telah terdaftar di daerah ini');
        } else {
            cb(true);
        }
    });
});

const LokasiModel = mongoose.model('lokasi', LokasiSchema);
export default LokasiModel;