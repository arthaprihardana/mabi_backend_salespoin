/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:11:04 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-18 00:50:04
 */
export default {
    API_URL: "http://localhost",
    API_PORT: 3000,
    API_VERSION: "/api/v1",
    DATABASE: 'mongodb://localhost:27017/mabi_salespoin',
    DB_AUTH: {
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    },
    GOOGLE_API_KEY: ""
}