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
        //CubeTexture only support DRAW_IN_CANVAS
        get sourceRegionMethod(){
            return TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }

        public textures:dyCb.Collection<CubeFaceTexture> = dyCb.Collection.create<CubeFaceTexture>();

        private _assets:Array<ICubemapData>= null;

        protected target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        public copy(){
            return this.copyHelper(CubeTexture.create(this._assets));
        }

        public initWhenCreate(){
            dyCb.Log.error(this._assets.length !== 6, dyCb.Log.info.FUNC_MUST("cubemap", "has 6 assets"));
            this._judgeAssetsAreAllCommonAssetsOrAllCompressedAssets(this._assets);

            this._createTextures(this._assets);


            this.width = this.textures.getChild(0).width;
            this.height = this.textures.getChild(0).height;
            /*!
            skybox don't use mipmaps default
             */
            this.generateMipmaps = false;
            this.minFilter = this.filterFallback(this.minFilter);
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

        private _isAllCompressedAsset:boolean = false;


        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var gl = Director.getInstance().gl,
                self = this;

            if(this._isAllCompressedAsset){
                //todo move to load compressed texture, add to CompressedTextureAsset
                var format = this._getCompressedFormat();

                this.textures.forEach((texture:CubeFaceCompressedTexture, i:number) => {
                    if (texture.format !== TextureFormat.RGBA) {
                        texture.mipmaps.forEach((mipmap:ICompressedTextureMipmap, index:number) => {
                            gl.compressedTexImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, index, format, mipmap.width, mipmap.height, 0, self.getDrawTarget(mipmap.data));
                        });
                    }
                    else{
                        texture.mipmaps.forEach((mipmap:ICompressedTextureMipmap, index:number) => {
                            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, index, gl[self.format], mipmap.width, mipmap.height, 0, gl[self.format], gl[self.type], self.getDrawTarget(mipmap.data));
                        });
                    }
                });
            }
            else{
                this.textures.forEach((texture:CubeFaceTwoDTexture, i:number) => {
                    //texture.draw(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, self.getDrawTarget(texture.source, texture.sourceRegion));
                    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl[texture.format], gl[texture.format], gl[texture.type], self.getDrawTarget(texture.source, texture.sourceRegion));
                });
            }
        }

        private _getCompressedFormat(){
            var extension = GPUDetector.getInstance().extensionCompressedTextureS3TC,
                format = null;

            if(this.format === TextureFormat.RGBA){
                return this.format;
            }

            if(!extension){
                return null;
            }

            switch (this.format){
                case TextureFormat.RGB_S3TC_DXT1:
                    format = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT1:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT3:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT5:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
            }

            return format;
        }


        protected clampToMaxSize(){
            var self = this,
                maxSize = GPUDetector.getInstance().maxCubemapTextureSize;

            this.textures.forEach((texture:CubeFaceTexture) => {
                //todo refactor?
                if(texture.source){
                    texture.source = self.clampToMaxSizeHelper(texture.source, maxSize);
                }
            });
        }

        //private _drawTexture(){
        //    var gl = Director.getInstance().gl,
        //        self = this;
        //
        //    this.textures.forEach((texture:CubeFaceTexture, i:number) => {
        //        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl[texture.format], gl[texture.format], gl[texture.type], self.getDrawTarget(texture.source, texture.sourceRegion));
        //    });
        //}

        private _createTextures(assets:Array<ICubemapData>){
            var self = this;

            assets.forEach((data:ICubemapData) => {
                var face = CubeFaceFactory.create(data.asset);

                //face.asset = data.asset;
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

