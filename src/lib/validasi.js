/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 11:19:47 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-18 11:20:40
 */
export default {
    email: (email) => {
        let regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        return regex.test(email);
    },
    phone: (phone) => {
        let regex = /^(^\+62\s?|^0)(\d{3,4}?){2}\d{3,4}$/;
        return regex.test(phone);
    }
}