module wd{
    export class CubemapTexture extends BasicTexture{
        public static create(assets:Array<CubemapData>){
            var obj = new this(assets);

            obj.initWhenCreate(assets);

            return obj;
        }

        constructor(assets:Array<CubemapData>){
            super();

            this.assets = assets;
        }

        public assets:Array<CubemapData> = null;
        public textures:wdCb.Collection<CubemapFaceTexture> = wdCb.Collection.create<CubemapFaceTexture>();
        @cloneAttributeAsBasicType()
        public mode:EEnvMapMode = null;

        protected target:ETextureTarget = ETextureTarget.TEXTURE_CUBE_MAP;

        private _areAllCompressedAsset:boolean = false;

        public clone(){
            var resultAssets = null;

            if(this.assets !== null){
                resultAssets = [].concat(this.assets);
            }
            else{
                resultAssets = null;
            }

            return CloneUtils.clone(this, null, [resultAssets]);
        }

        @require(function(assets:Array<CubemapData>){
            assert(assets.length === 6, Log.info.FUNC_MUST("cubemap", "has 6 assets"));
            assert(this._areAssetsAllImageAssets(assets) || this._areAssetsAllCompressedAsset(assets), Log.info.FUNC_MUST_BE("cubemap six face's assets", "all ImageTextureAsset or all CompressedTextureAsset"));

            if(this._areAssetsAllCompressedAsset(assets)){
                assert(!this._hasSourceRegion(assets), Log.info.FUNC_SHOULD_NOT("compressed face", "contain sourceRegion data"));
            }

            assert(this._areTextureSizOfAllFaceseEqual(assets), Log.info.FUNC_MUST_BE("all cubemap faces' texture size", "equal"));
        })
        public initWhenCreate(assets:Array<CubemapData>){
            super.initWhenCreate();

            if(this._areAssetsAllCompressedAsset(assets)){
                this._areAllCompressedAsset = true;
            }
            else{
                this._areAllCompressedAsset = false;
            }

            this._createTextures(assets);

            this._getRepresentAsset(assets).cloneToCubemapTexture(this);

            if(this._areAllCompressedAsset){
                this.generateMipmaps = false;

                if(this._hasNoMipmapCompressedAsset()){
                    this.minFilter = this.filterFallback(this.minFilter);
                }
            }
            else{
                this.generateMipmaps = true;
            }

            this.flipY = false;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_CUBE);
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            if(this._areAllCompressedAsset){
                this.textures.forEach((texture:CubemapFaceCompressedTexture, i:number) => {
                    texture.draw(i);
                });
            }
            else{
                this.textures.forEach((texture:CubemapFaceImageTexture, i:number) => {
                    texture.draw(i);
                });
            }
        }

        protected needClampMaxSize(){
            var needAllClampMaxSize = false;

            this.textures.forEach((texture:CubemapFaceTexture) => {
                if(texture.needClampMaxSize()){
                    needAllClampMaxSize = true;
                    return wdCb.$BREAK;
                }
            });

            return needAllClampMaxSize;
        }

        protected isSourcePowerOfTwo(){
            var areAllSourcePowerOfTwo = true;

            this.textures.forEach((texture:CubemapFaceTexture) => {
                if(!texture.isSourcePowerOfTwo()){
                    areAllSourcePowerOfTwo = false;
                    return wdCb.$BREAK;
                }
            });

            return areAllSourcePowerOfTwo;
        }

        protected clampToMaxSize(){
            this.textures.forEach((texture:any) => {
                texture.clampToMaxSize();
            });
        }

        private _hasNoMipmapCompressedAsset(){
            var self = this;

            if(!this._areAllCompressedAsset){
                return false;
            }

            return this.textures.filter((texture:CubemapFaceCompressedTexture) => {
                return !self._isMipmapFilter(texture.minFilter);
            }).getCount() > 0;
        }

        private _isMipmapFilter(filter:ETextureFilterMode){
            return filter === ETextureFilterMode.LINEAR_MIPMAP_LINEAR || filter === ETextureFilterMode.LINEAR_MIPMAP_NEAREST || filter === ETextureFilterMode.NEAREST_MIPMAP_LINEAR ||filter === ETextureFilterMode.NEAREST_MIPMAP_MEAREST;
        }

        private _getRepresentAsset(assets:Array<CubemapData>){
            return assets[0].asset;
        }

        private  _areAssetsAllImageAssets(assets:Array<CubemapData>){
            var areImageAssets = [];

            for(let data of assets) {
                if (data.asset instanceof ImageTextureAsset) {
                    areImageAssets.push(data);
                }
            }

            return areImageAssets.length === 6;
        }

        private  _areAssetsAllCompressedAsset(assets:Array<CubemapData>){
            var areCompressedAssets = [];

            for(let data of assets) {
                if (data.asset instanceof CompressedTextureAsset) {
                    areCompressedAssets.push(data);
                }
            }

            return areCompressedAssets.length === 6;
        }

        private _createTextures(assets:Array<CubemapData>){
            var self = this;

            for(let data of assets) {
                let face = data.asset.toCubemapFaceTexture();

                if (data.sourceRegion && face instanceof CubemapFaceImageTexture) {
                    let twoDFace:CubemapFaceImageTexture = face;
                    twoDFace.sourceRegion = data.sourceRegion;
                }
                if (data.type) {
                    face.type = data.type;
                }

                self.textures.addChild(face);
            }
        }

        private _areTextureSizOfAllFaceseEqual(assets:Array<CubemapData>){
            var textureWidthSizeArr = [],
                textureHeightSizeArr = [];

            for(let data of assets) {
                if (data.sourceRegion) {
                    textureWidthSizeArr.push(data.sourceRegion.width);
                    textureHeightSizeArr.push(data.sourceRegion.height);
                }
                else{
                    textureWidthSizeArr.push(data.asset.width);
                    textureHeightSizeArr.push(data.asset.height);
                }
            }

            return this._areAllElementsEqual(textureWidthSizeArr) && this._areAllElementsEqual(textureHeightSizeArr);
        }

        private _hasSourceRegion(assets:Array<CubemapData>){
            for(let data of assets){
                if(data.sourceRegion){
                    return true;
                }
            }

            return false;
        }

        private _areAllElementsEqual(arr:Array<any>){
            var lastEle = arr[0];

            for(let ele of arr){
                if(ele !== lastEle){
                    return false;
                }
            }

            return true;
        }
    }

    export type CubemapData = {
        asset:TextureAsset;
        sourceRegion?:RectRegion;
        type?:ETextureType;
    }
}

