/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubemapTexture extends Texture{
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
        public textures:dyCb.Collection<CubemapFaceTexture> = dyCb.Collection.create<CubemapFaceTexture>();
        public mode:EnvMapMode = null;

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        private _isAllCompressedAsset:boolean = false;


        public initWhenCreate(assets:Array<CubemapData>){
            dyCb.Log.error(assets.length !== 6, dyCb.Log.info.FUNC_MUST("cubemap", "has 6 assets"));
            this._judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(assets);

            this._createTextures(assets);

            this._getRepresentAsset(assets).copyToCubemapTexture(this);

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

        public sendData(program:Program, index:number){
            this.sendSamplerVariable(VariableType.SAMPLER_CUBE, program, index);

            program.sendUniformData("u_repeatRegion", VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            if(this._isAllCompressedAsset){
                this.textures.forEach((texture:CubemapFaceCompressedTexture, i:number) => {
                    texture.draw(i);
                });
            }
            else{

                this.textures.forEach((texture:CubemapFaceTwoDTexture, i:number) => {
                    texture.draw(i);
                });
            }
        }

        protected isSourcePowerOfTwo(){
            var isAllSourcePowerOfTwo = true,
                self = this;

            this.textures.forEach((texture:CubemapFaceTexture) => {
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

            return this.textures.filter((texture:CubemapFaceCompressedTexture) => {
                return !self._isMipmapFilter(texture.minFilter);
            }).getCount() > 0;
        }

        private _isMipmapFilter(filter:TextureFilterMode){
            return filter === TextureFilterMode.LINEAR_MIPMAP_LINEAR || filter === TextureFilterMode.LINEAR_MIPMAP_NEAREST || filter === TextureFilterMode.NEAREST_MIPMAP_LINEAR ||filter === TextureFilterMode.NEAREST_MIPMAP_MEAREST;
        }

        private _getRepresentAsset(assets:Array<CubemapData>){
            return assets[0].asset;
        }

        private  _judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(assets:Array<CubemapData>){
            var isCompressedAssets = [],
                isCommonAssets = [];

            assets.forEach((asset:CubemapData) => {
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

        private _createTextures(assets:Array<CubemapData>){
            var self = this;

            assets.forEach((data:CubemapData) => {
                var face = data.asset.toCubemapFaceTexture();

                if(data.sourceRegion && face instanceof CubemapFaceTwoDTexture){
                    let twoDFace:CubemapFaceTwoDTexture = face;
                    twoDFace.sourceRegion = data.sourceRegion;
                }
                if(data.type){
                    face.type = data.type;
                }

                self.textures.addChild(face);
            });
        }
    }

    export type CubemapData = {
        asset:TextureAsset;
        sourceRegion?:RectRegion;
        type?:TextureType;
    }
}

