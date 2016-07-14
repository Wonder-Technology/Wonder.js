module wd{
    export class BasicBitmapFontMaterial extends BitmapFontMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        protected addEndShaderLib(){
            super.addEndShaderLib();

            this.shader.addLib(BasicBitmapFontShaderLib.create());
        }
    }
}

