module wd{
    export abstract class SourceLight extends Light{
        private _intensity:number = 1;
        @cloneAttributeAsBasicType()
        get intensity(){
            return this._intensity;
        }
        set intensity(intensity:number){
            this._intensity = intensity;

            this._isIntensityDirty = true;
        }

        private _isIntensityDirty:boolean = true;

        public isIntensityDirty(){
            return this._isIntensityDirty;
        }

        public resetGLSLDirty(){
            super.resetGLSLDirty();

            this._isIntensityDirty =  false;
        }
    }
}

