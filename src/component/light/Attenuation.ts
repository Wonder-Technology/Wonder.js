/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Attenuation {
        public static create() {
            var obj = new this();

            return obj;
        }

        get constant() {
            return 1.0;
        }

        private _range:number = null;
        get range() {
            return this._range;
        }

        private _linear:number = null;
        get linear() {
            return this._linear;
        }

        private _quadratic:number = null;
        get quadratic() {
            return this._quadratic;
        }

        private _rangeLevel:number = 0;
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;

            this.setByRangeLevel();
        }

        public setByRangeLevel() {
            switch (this._rangeLevel) {
                case 0:
                    this._range = 7;
                    this._linear = 0.7;
                    this._quadratic = 1.8;
                    break;
                case 1:
                    this._range = 13;
                    this._linear = 0.35;
                    this._quadratic = 0.44;
                    break;
                case 2:
                    this._range = 20;
                    this._linear = 0.22;
                    this._quadratic = 0.20;
                    break;
                case 3:
                    this._range = 32;
                    this._linear = 0.14;
                    this._quadratic = 0.07;
                    break;
                case 4:
                    this._range = 50;
                    this._linear = 0.09;
                    this._quadratic = 0.032;
                    break;
                case 5:
                    this._range = 65;
                    this._linear = 0.07;
                    this._quadratic = 0.017;
                    break;
                case 6:
                    this._range = 100;
                    this._linear = 0.045;
                    this._quadratic = 0.0075;
                    break;
                case 7:
                    this._range = 160;
                    this._linear = 0.027;
                    this._quadratic = 0.0028;
                    break;
                case 8:
                    this._range = 200;
                    this._linear = 0.022;
                    this._quadratic = 0.0019;
                    break;
                case 9:
                    this._range = 325;
                    this._linear = 0.014;
                    this._quadratic = 0.0007;
                    break;
                case 10:
                    this._range = 600;
                    this._linear = 0.007;
                    this._quadratic = 0.0002;
                    break;
                case 11:
                    this._range = 3250;
                    this._linear = 0.0014;
                    this._quadratic = 0.000007;
                    break;
                default :
                    dyCb.Log.error(true, "over light range");
                    break;
            }
        }
    }
}
