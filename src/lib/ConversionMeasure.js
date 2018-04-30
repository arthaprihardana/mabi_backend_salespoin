/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-29 22:54:15 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-29 23:39:00
 */
export default class ConversionMeasure {
    
    constructor(val, measure) {
        this.val = val;
        this.measure = measure;

        this.toFeet = null;
        this.toInches = null;
        this.toYards = null;
        this.toMiles = null;
        this.toMeters = null;
        this.toCm = null;
        this.toKilometers = null;

        this.basicMeasure();
    }

    basicMeasure() {
        switch (this.measure) {
            case "feet":
                this.toFeet = parseFloat(this.val);
                this.toInches = parseFloat(this.val) * 12;
                this.toYards = parseFloat(this.val) * 0.333333;
                this.toMiles = parseFloat(this.val) * 0.000189394;
                this.toMeters = parseFloat(this.val) * 0.3048;
                this.toCm = parseFloat(this.val) * 30.48;
                this.toKilometers = parseFloat(this.val) * 0.0003048;
                break;
            case "inches": 
                this.toFeet = parseFloat(this.val) * 0.0833333;
                this.toInches = parseFloat(this.val);
                this.toYards = parseFloat(this.val) * 0.0277778;
                this.toMiles = parseFloat(this.val) * 0.0000157828;
                this.toMeters = parseFloat(this.val) * 0.0254;
                this.toCm = parseFloat(this.val) * 2.54;
                this.toKilometers = parseFloat(this.val) * 0.0000254;
                break;
            case "yards": 
                this.toFeet = parseFloat(this.val) * 3;
                this.toInches = parseFloat(this.val) * 36;
                this.toYards = parseFloat(this.val);
                this.toMiles = parseFloat(this.val) * 0.000568182;
                this.toMeters = parseFloat(this.val) * 0.9144;
                this.toCm = parseFloat(this.val) * 91.44;
                this.toKilometers = parseFloat(this.val) * 0.0009144;
                break;
            case "miles":
                this.toFeet = parseFloat(this.val) * 5280;
                this.toInches = parseFloat(this.val) * 63360;
                this.toYards = parseFloat(this.val) * 1760;
                this.toMiles = parseFloat(this.val);
                this.toMeters = parseFloat(this.val) * 1609.34;
                this.toCm = parseFloat(this.val) * 160934;
                this.toKilometers = parseFloat(this.val) * 1.60934;
                break;
            case "meters": 
                this.toFeet = parseFloat(this.val) * 3.28084;
                this.toInches = parseFloat(this.val) * 39.3701;
                this.toYards = parseFloat(this.val) * 1.09361;
                this.toMiles = parseFloat(this.val) * 0.000621371;
                this.toMeters = parseFloat(this.val);
                this.toCm = parseFloat(this.val) * 100;
                this.toKilometers = parseFloat(this.val) * 0.001;
                break;
            case "cm":
                this.toFeet = parseFloat(this.val) * 0.0328084;
                this.toInches = parseFloat(this.val) * 0.393701;
                this.toYards = parseFloat(this.val) * 0.0109361;
                this.toMiles = parseFloat(this.val) * 0.0000062137;
                this.toMeters = parseFloat(this.val) * 0.01;
                this.toCm = parseFloat(this.val);
                this.toKilometers = parseFloat(this.val) * 0.00001;
                break;
            case "km":
                this.toFeet = parseFloat(this.val) * 3280.84;
                this.toInches = parseFloat(this.val) * 39370.1;
                this.toYards = parseFloat(this.val) * 1093.61;
                this.toMiles = parseFloat(this.val) * 0.621371;
                this.toMeters = parseFloat(this.val) * 1000;
                this.toCm = parseFloat(this.val) * 100000;
                this.toKilometers = parseFloat(this.val);
                break;
            default:
                break;
        }
    }
    
    convertToFeet() {
        return `${Math.round(this.toFeet, 2)} Feet`;
    }

    convertToInches() {
        return `${Math.round(this.toInches, 2)} Inches`;
    }

    convertToYards() {
        return `${Math.round(this.toYards, 2)} Yards`;
    }

    convertToMiles() {
        return `${Math.round(this.toMiles, 2)} Miles`;
    }

    convertToMeters() {
        return `${Math.round(this.toMeters, 2)} Meter`;
    }

    convertToCm() {
        return `${Math.round(this.toCm, 2)} Cm`;
    }

    convertToKilometers() {
        return `${Math.round(this.toKilometers, 2)} Km`;
    }

}