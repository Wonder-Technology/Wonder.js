/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubeTexture extends Texture{
        public static create(assets:Array<ICubemapData>){
            var obj = new this();

            obj.initWhenCreate(assets);

            return obj;
        }

        public textures:dyCb.Collection<CubeFaceTexture> = dyCb.Collection.create<CubeFaceTexture>();

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

        public sendData(index){
            var program = Director.getInstance().stage.program;

            program.setUniformData("u_sampler" + index, render.UniformDataType.NUMBER_1, index);
            program.setUniformData("u_repeatRegion", render.UniformDataType.FLOAT_4, this.repeatRegion);

            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = Director.getInstance().gl;

            if(this._isAllCompressedAsset){
                //cube compressed texture not support sourceRegion
                this.textures.forEach((texture:CubeFaceCompressedTexture, i:number) => {
                    var compressedCmd = DrawCompressedTextureCommand.create();

                    compressedCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
                    compressedCmd.type = texture.type;
                    compressedCmd.format = texture.format;
                    compressedCmd.mipmaps = texture.mipmaps;

                    compressedCmd.execute();
                });
            }
            else{
                //todo support manual mipmap

                this.textures.forEach((texture:CubeFaceTwoDTexture, i:number) => {
                    var noMipmapCmd = DrawNoMipmapTwoDTextureCommand.create();

                    noMipmapCmd.source = texture.source;
                    noMipmapCmd.sourceRegion = texture.sourceRegion;
                    //cube twoD texture only support DRAW_IN_CANVAS
                    //noMipmapCmd.sourceRegionMethod = TextureSourceRegionMethod.DRAW_IN_CANVAS;
                    noMipmapCmd.sourceRegionMethod = texture.sourceRegionMethod;
                    noMipmapCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
                    noMipmapCmd.format = texture.format;
                    noMipmapCmd.type = texture.type;

                    noMipmapCmd.execute();
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

            return this.textures.filter((texture:ICubeFaceCompressedTextureAsset) => {
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
                if(asset.asset instanceof CommonTextureAsset){
                    isCommonAssets.push(asset);
                }
                else if(asset.asset instanceof CompressedTextureAsset){
                    isCompressedAssets.push(asset);
                }
            });

            dyCb.Log.error(isCommonAssets.length > 0 && isCompressedAssets.length > 0, dyCb.Log.info.FUNC_MUST_BE("cubemap's six face's assets", "all CommonTextureAsset or all CompressedTextureAsset"));

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

