//todo test
module wd{
    export class SdfFontMaterial extends BitmapFontMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public type:SdfFontType = SdfFontType.SMOOTH;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;

        protected addEndShaderLib(){
            super.addEndShaderLib();

            switch (this.type){
                case SdfFontType.SMOOTH:
                    this.shader.addLib(SdfFontSmoothShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`type:${this.type}`));
            }
        }
    }
}
