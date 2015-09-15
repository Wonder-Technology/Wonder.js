/// <reference path="../../definitions.d.ts"/>
module dy{
    export class PointLight extends Light{
        public static type:string = "pointLight";

        public static create() {
            var obj = new this();

            return obj;
        }

        private _rangeLevel:number = null;
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;
            this._attenuation.rangeLevel = this._rangeLevel;
        }

        get range(){
            return this._attenuation.range;
        }

        get constant(){
            return this._attenuation.constant;
        }

        get linear(){
            return this._attenuation.linear;
        }

        get quadratic(){
            return this._attenuation.quadratic;
        }

        public intensity:number = 1;

        private _attenuation:Attenuation = Attenuation.create();
    }
}
