module wd{
    export class BasicBitmapFontShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_bitmapFont";
    }
}

