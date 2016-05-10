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

            this._isRangeDataDirty = true;
        }

        @cloneAttributeAsBasicType()
        get range(){
            return this._attenuation.range;
        }
        set range(range:number){
            this._attenuation.range = range;

            this._isRangeDataDirty = true;
        }

        @cloneAttributeAsBasicType()
        get constant(){
            return this._attenuation.constant;
        }
        set constant(constant:number){
            this._attenuation.constant = constant;

            this._isRangeDataDirty = true;
        }

        @cloneAttributeAsBasicType()
        get linear(){
            return this._attenuation.linear;
        }
        set linear(linear:number){
            this._attenuation.linear = linear;

            this._isRangeDataDirty = true;
        }

        @cloneAttributeAsBasicType()
        get quadratic(){
            return this._attenuation.quadratic;
        }
        set quadratic(quadratic:number){
            this._attenuation.quadratic = quadratic;

            this._isRangeDataDirty = true;
        }

        private _attenuation:Attenuation = Attenuation.create();
        private _isRangeDataDirty:boolean = true;

        public isRangeDataDirty(){
            return this._isRangeDataDirty;
        }

        public resetGLSLDirty(){
            super.resetGLSLDirty();

            this._isRangeDataDirty = false;
        }
    }
}
