/// <reference path="../definitions.d.ts"/>
module dy{
    /*!skybox: it's flipX when viewer is inside the skybox*/

    export class CubeTexture extends Texture{
        public static create(assets:Array<ICubemapData>){
            var obj = new this(assets);

            obj.initWhenCreate();

            return obj;
        }

        constructor(assets:Array<ICubemapData>){
            super();

            this._assets = assets;
            this.flipY = false;
        }

        public textures:dyCb.Collection<CubeFaceTexture> = dyCb.Collection.create<CubeFaceTexture>();

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        private _assets:Array<ICubemapData>= null;
        private _isAllCompressedAsset:boolean = false;


        public copy(){
            return this.copyHelper(CubeTexture.create(this._assets));
        }

        public initWhenCreate(){
            dyCb.Log.error(this._assets.length !== 6, dyCb.Log.info.FUNC_MUST("cubemap", "has 6 assets"));
            this._judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(this._assets);

            this._createTextures(this._assets);


            this.width = this._getRepresentTexture().width;
            this.height =this._getRepresentTexture().height;
        }

        public sendData(index){
            var program = Director.getInstance().stage.program;

            program.setUniformData("u_sampler" + index, render.UniformDataType.NUMBER_1, index);
            program.setUniformData("u_repeatRegion", render.UniformDataType.FLOAT_4, this.repeatRegion);

            return this;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = Director.getInstance().gl,
                self = this;

            if(this._isAllCompressedAsset){
                //cube compressed texture not support sourceRegion
                this.textures.forEach((texture:CubeFaceCompressedTexture, i:number) => {
                    var compressedCmd = DrawCompressedTextureCommand.create();

                    compressedCmd.glTarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
                    compressedCmd.type = texture.type;
                    compressedCmd.format = texture.format;
                    compressedCmd.mipmaps = texture.mipmaps;
                    compressedCmd.texture = self;

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
                    noMipmapCmd.sourceRegionMethod = TextureSourceRegionMethod.DRAW_IN_CANVAS;
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

            this.textures.forEach((texture:CubeFaceTexture) => {
                if(texture.source){
                    texture.source = self.clampToMaxSizeHelper(texture.source, maxSize);
                }
            });
        }

        private _getRepresentTexture(){
            return this.textures.getChild(0);
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
                var face = CubeFaceFactory.create(data.asset);

                if(data.sourceRegion){
                    face.sourceRegion = data.sourceRegion;
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

