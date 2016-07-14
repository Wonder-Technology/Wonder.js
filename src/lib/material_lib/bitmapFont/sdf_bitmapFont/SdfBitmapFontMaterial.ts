//todo test
module wd{
    export class SdfBitmapFontMaterial extends BitmapFontMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public type:SdfBitmapFontType = SdfBitmapFontType.SMOOTH;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;

        protected addEndShaderLib(){
            super.addEndShaderLib();

            switch (this.type){
                case SdfBitmapFontType.SMOOTH:
                    this.shader.addLib(SdfBitmapFontSmoothShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`type:${this.type}`));
            }
        }
    }
}
