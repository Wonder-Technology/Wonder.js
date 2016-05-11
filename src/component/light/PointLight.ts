module wd{
    export class PointLight extends SourceLight{
        public static type:string = "pointLight";

        public static create() {
            var obj = new this();

            return obj;
        }

        private _rangeLevel:number = null;
        @cloneAttributeAsBasicType()
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;
            this._attenuation.rangeLevel = this._rangeLevel;
        }

        @cloneAttributeAsBasicType()
        get range(){
            return this._attenuation.range;
        }
        set range(range:number){
            this._attenuation.range = range;
        }

        @cloneAttributeAsBasicType()
        get constant(){
            return this._attenuation.constant;
        }
        set constant(constant:number){
            this._attenuation.constant = constant;
        }

        @cloneAttributeAsBasicType()
        get linear(){
            return this._attenuation.linear;
        }
        set linear(linear:number){
            this._attenuation.linear = linear;
        }

        @cloneAttributeAsBasicType()
        get quadratic(){
            return this._attenuation.quadratic;
        }
        set quadratic(quadratic:number){
            this._attenuation.quadratic = quadratic;
        }

        private _attenuation:Attenuation = Attenuation.create();
    }
}
