/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:11:04 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-21 14:19:54
 */
export default {
    // API_URL: "http://192.168.1.143",
    API_URL: "http://localhost",
    // API_URL: "188.166.174.221",
    API_PORT: 3000,
    API_VERSION: "/api/v1",
    DATABASE: 'mongodb://localhost:27017/mabi_salespoin',
    // DATABASE: 'mongodb://mabi:d4127ha@localhost:27017/mabi_salespoin',
    SECRET_KEY: "rahasiabangetpokonya",
    DB_AUTH: {
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    },
    GOOGLE_API_KEY: "",
    RADIUS: 0.310686,   // satuan jarak dalam miles ( saat ini diatur 500 m )
    EARTH_RADIUS: 3963.2,
    SMTP_CONFIG: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: 'arthaprihardana@gmail.com',
            pass: 'd4127haPrihardana'
        },
        tls:{
            rejectUnauthorized: false
        }
    }
}