module wd{
    export class TextureCache{
        private static _cache:Array<Texture> = [];

        public static isCached(unit:number, texture:Texture){
            return JudgeUtils.isEqual(this.getActiveTexture(unit), texture);
        }

        @require(function(unit:number, texture:Texture){
            this._checkUnit(unit);
        })
        public static addActiveTexture(unit:number, texture:Texture){
            this._cache[unit] = texture;
        }

        @require(function(unit:number, texture:Texture){
            this._checkUnit(unit);
        })
        public static getActiveTexture(unit:number){
            return this._cache[unit];
        }

        //todo test
        public static clearAll(){
            this._cache = [];
        }

        private static _checkUnit(unit:number){
            var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;

            assert(unit >= 0, Log.info.FUNC_SHOULD("texture unit", `>= 0, but actual is ${unit}`));
            assert(unit < maxTextureUnit, `trying to cache ${unit} texture units, but GPU only supports ${maxTextureUnit} units`);
        }
    }
}

