/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 13:33:42 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-05-01 22:11:53
 */
import mongoose from 'mongoose';
import config from '../app.conf';
import ConversionMeasure from '../lib/conversionMeasure';

const conversion = new ConversionMeasure(config.RADIUS, "miles");
const radius = conversion.convertToMeters();

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
            index:'2dsphere',
            validate: {
                validator: async (val) => {
                    try {
                        let qry = await LokasiModel.find({
                            'gmaps.location': {
                                $geoWithin: {
                                    $centerSphere: [ val, parseFloat(config.RADIUS) / parseFloat(config.EARTH_RADIUS) ]
                                }
                            }
                        }).exec();
                        return (qry.length == 0);
                    } catch (error) {
                        return false;
                    }
                },
                message: 'Dalam radius '+radius+' dari koordinat {VALUE} telah terdaftar tempat penyimpanan yang dilakukan oleh agen'
            },
            default: [0, 0]
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
    },
    agen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// LokasiSchema.path('gmaps.location').validate(( val, cb ) => {
    // LokasiModel.find({
    //     'gmaps.location': {
    //         $geoWithin: {
    //             $centerSphere: [ val.split(',').map(Number), parseFloat(config.RADIUS)/parseFloat(config.EARTH_RADIUS) ]
    //         }
    //     }
    // }, (err, docs) => {
//         if(docs.length > 0) {
//             cb(false, 'Lokasi dengan radius tersebut telah terdaftar di daerah ini');
//         } else {
//             cb(true);
//         }
//     });
// });

const LokasiModel = mongoose.model('lokasi', LokasiSchema);
export default LokasiModel;