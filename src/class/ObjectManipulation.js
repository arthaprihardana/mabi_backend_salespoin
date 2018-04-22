/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-22 13:07:49 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-22 13:09:23
 */
export default class ObjectManipulation {
    
    constructor(obj, key, val) {
        this.obj = obj;
        this.key = key;
        this.val = val;
    }

    filter() {
        let filter = {};
        for (let i in this.obj) {
            if (this.key.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(this.obj, i)) continue;
            filter[i] = this.obj[i];
        }
        return filter;
    }

    grouping() {
        let i = 0, val, index, values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }
    
}