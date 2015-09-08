/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeTexture extends Texture{
        public static create(assets:Array<ICubemapData>){
            var obj = new this(assets);

            obj.initWhenCreate(assets);

            return obj;
        }

        constructor(assets:Array<ICubemapData>){
            super();

            this.assets = assets;
        }

        public assets:Array<ICubemapData> = null;
        public textures:dyCb.Collection<CubeFaceTexture> = dyCb.Collection.create<CubeFaceTexture>();
        public mode:CubemapMode = null;

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        private _isAllCompressedAsset:boolean = false;


        public initWhenCreate(assets:Array<ICubemapData>){
            dyCb.Log.error(assets.length !== 6, dyCb.Log.info.FUNC_MUST("cubemap", "has 6 assets"));
            this._judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(assets);

            this._createTextures(assets);

            this._getRepresentAsset(assets).copyToCubeTexture(this);

            if(this._isAllCompressedAsset){
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

        public sendData(program:render.Program, index:number){
            program.setUniformData("u_sampler" + index, render.VariableType.NUMBER_1, index);
            program.setUniformData("u_repeatRegion", render.VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            if(this._isAllCompressedAsset){
                this.textures.forEach((texture:CubeFaceCompressedTexture, i:number) => {
                    texture.draw(i);
                });
            }
            else{

                this.textures.forEach((texture:CubeFaceTwoDTexture, i:number) => {
                    texture.draw(i);
                });
            }
        }

        protected isSourcePowerOfTwo(){
            var isAllSourcePowerOfTwo = true,
                self = this;

            this.textures.forEach((texture:CubeFaceTexture) => {
                if(!self.isPowerOfTwo(texture.width, texture.height)){
                    isAllSourcePowerOfTwo = false;
                    return dyCb.$BREAK;
                }
            });

            return isAllSourcePowerOfTwo;
        }

        protected clampToMaxSize(){
            var self = this,
                maxSize = GPUDetector.getInstance().maxCubemapTextureSize;

            this.textures.forEach((texture:any) => {
                if(texture.source){
                    texture.source = self.clampToMaxSizeHelper(texture.source, maxSize);
                }
            });
        }

        private _hasNoMipmapCompressedAsset(){
            var self = this;

            if(!this._isAllCompressedAsset){
                return false;
            }

            return this.textures.filter((texture:CubeFaceCompressedTexture) => {
                return !self._isMipmapFilter(texture.minFilter);
            }).getCount() > 0;
        }

        private _isMipmapFilter(filter:TextureFilterMode){
            return filter === TextureFilterMode.LINEAR_MIPMAP_LINEAR || filter === TextureFilterMode.LINEAR_MIPMAP_NEAREST || filter === TextureFilterMode.NEAREST_MIPMAP_LINEAR ||filter === TextureFilterMode.NEAREST_MIPMAP_MEAREST;
        }

        private _getRepresentAsset(assets:Array<ICubemapData>){
            return assets[0].asset;
        }

        private  _judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(assets:Array<ICubemapData>){
            var isCompressedAssets = [],
                isCommonAssets = [];

            assets.forEach((asset:ICubemapData) => {
                if(asset.asset instanceof TwoDTextureAsset){
                    isCommonAssets.push(asset);
                }
                else if(asset.asset instanceof CompressedTextureAsset){
                    isCompressedAssets.push(asset);
                }
            });

            dyCb.Log.error(isCommonAssets.length > 0 && isCompressedAssets.length > 0, dyCb.Log.info.FUNC_MUST_BE("cubemap's six face's assets", "all TwoDTextureAsset or all CompressedTextureAsset"));

            if(isCompressedAssets.length === 6){
                this._isAllCompressedAsset = true;
            }
            else{
                this._isAllCompressedAsset = false;
            }
        }

        private _createTextures(assets:Array<ICubemapData>){
            var self = this;

            assets.forEach((data:ICubemapData) => {
                var face = data.asset.toCubeFaceTexture();

                if(data.sourceRegion && face instanceof CubeFaceTwoDTexture){
                    let twoDFace:CubeFaceTwoDTexture = face;
                    twoDFace.sourceRegion = data.sourceRegion;
                }
                if(data.type){
                    face.type = data.type;
                }

                self.textures.addChild(face);
            });
        }
    }

    export interface ICubemapData{
        asset:TextureAsset;
        sourceRegion?:RectRegion;
        type?:TextureType;
    }
}

