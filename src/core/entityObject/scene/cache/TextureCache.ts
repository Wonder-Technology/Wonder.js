module wd{
    export class TextureCache{
        private static _bindTextureUnitCache:Array<Texture> = [];

        public static isCached(unit:number, texture:Texture){
            return JudgeUtils.isEqual(this.getActiveTexture(unit), texture);
        }

        @require(function(unit:number, texture:Texture){
            this._checkUnit(unit);
        })
        public static addActiveTexture(unit:number, texture:Texture){
            this._bindTextureUnitCache[unit] = texture;
        }

        @require(function(unit:number, texture:Texture){
            this._checkUnit(unit);
        })
        public static getActiveTexture(unit:number){
            return this._bindTextureUnitCache[unit];
        }

        public static clearAll(){
            this._bindTextureUnitCache = [];
        }

        public static clearAllBindTextureUnitCache(){
            this._bindTextureUnitCache = [];
        }

        public static clearBindTextureUnitCache(unit:number){
            this._bindTextureUnitCache[unit] = null;
        }

        private static _checkUnit(unit:number){
            var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;

            assert(unit >= 0, Log.info.FUNC_SHOULD("texture unit", `>= 0, but actual is ${unit}`));
            assert(unit < maxTextureUnit, `trying to cache ${unit} texture units, but GPU only supports ${maxTextureUnit} units`);
        }
    }
}

