//todo test
module wd{
    export class SdfFontMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _bitmap:ImageTexture = null;
        get bitmap(){
            return this._bitmap;
        }
        @requireSetter(function(map:ImageTexture){
            it("should add ImageTexture", function () {
                expect(map).instanceOf(ImageTexture);
            });
        })
        set bitmap(map:ImageTexture){
            this._bitmap = map;
            this.mapManager.addMap(map);
        }

        @cloneAttributeAsBasicType()
        public type:SdfFontType = SdfFontType.SMOOTH;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;

        public initWhenCreate(){
            super.initWhenCreate();

            this.blend = true;
        }

        public getTextureForRenderSort():Texture{
            return this.bitmap;
        }

        protected addEndShaderLib(){
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
