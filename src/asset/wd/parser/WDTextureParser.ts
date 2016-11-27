module wd{
    export class WDTextureParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public imageMap:wdCb.Hash<HTMLImageElement> = null;
        public json:IWDJsonDataParser = null;
        public glTextureMap:wdCb.Hash<WebGLTexture> = wdCb.Hash.create<WebGLTexture>();

        public getTexture(textureDataId:string):Texture{
            var textureData:IWDTextureParser = null,
                asset:TextureAsset = null;

            if(!this.json.textures || !this.json.textures[textureDataId]) {
                return null;
            }

            textureData = this.json.textures[textureDataId];

            asset = this._createTextureAsset(textureData.target, textureData.source);

            if(!!textureData.format){
                asset.format = this._getTextureFormat(textureData.format);

                if(!!textureData.internalFormat){
                    if(textureData.internalFormat !== textureData.format){
                        Log.warn(`textureData.internalFormat(${textureData.internalFormat}) !== textureData.format(${textureData.format}), here take textureData.format value as their value`);
                    }
                }
            }

            if(!!textureData.type){
                asset.type = this._getTextureType(textureData.type);
            }

            this._addTextureSampler(asset, textureData.sampler);

            let glTexture:WebGLTexture = this._getGLTexture(asset, textureData.source),
                texture = asset.toTexture();

            if(glTexture !== null){
                texture.glTexture = glTexture;
            }

            return texture;
        }

        private _getGLTexture(asset:TextureAsset, sourceId:string){
            var key:string = this._buildGLTextureMapKey(asset, sourceId),
                glTexture:WebGLTexture = null;

            if(this.glTextureMap.hasChild(key)){
                return this.glTextureMap.getChild(key);
            }

            glTexture = DeviceManager.getInstance().gl.createTexture();

            this.glTextureMap.addChild(key, glTexture);

            return glTexture;
        }

        private _buildGLTextureMapKey(asset:TextureAsset, sourceId:string){
            return `${sourceId}_${asset.wrapS}_${asset.wrapT}_${asset.magFilter}_${asset.minFilter}`;
        }

        private _createTextureAsset(target:number, imageId:string){
            var asset:TextureAsset = null,
                source = this.imageMap.getChild(imageId);

            if(!source){
                Log.warn(`no image found in loader(id:${imageId})`);
            }

            //todo support default target
            switch (target){
                case 3553:
                    asset = ImageTextureAsset.create(source);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT("target except TEXTURE_2D"));
                    break;
            }

            return asset;
        }

        private _getTextureType(type:number){
            var textureType:ETextureType = null;

            switch(type){
                case 5121:
                    textureType = ETextureType.UNSIGNED_BYTE;
                    break;
                case 33635:
                    textureType = ETextureType.UNSIGNED_SHORT_5_6_5;
                    break;
                case 32819:
                    textureType = ETextureType.UNSIGNED_SHORT_4_4_4_4;
                    break;
                case 32820:
                    textureType = ETextureType.UNSIGNED_SHORT_5_5_5_1;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture->type:${type}`));
                    break;
            }

            return textureType;
        }

        private _getTextureFormat(format:number){
            var textureFormat:ETextureFormat = null;

            switch(format){
                case 6406:
                    textureFormat = ETextureFormat.ALPHA;
                    break;
                case 6407:
                    textureFormat = ETextureFormat.RGB;
                    break;
                case 6408:
                    textureFormat = ETextureFormat.RGBA;
                    break;
                case 6409:
                    textureFormat = ETextureFormat.LUMINANCE;
                    break;
                case 6410:
                    textureFormat = ETextureFormat.LUMINANCE_ALPHA;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture->format:${format}`));
                    break;
            }

            return textureFormat;
        }

        @require(function(asset:TextureAsset, samplerId:string){
            assert(!!this.json.samplers[samplerId], Log.info.FUNC_NOT_EXIST(`samplerId:${samplerId}`));
        })
        private _addTextureSampler(asset:TextureAsset, samplerId:string){
            var sampler = this.json.samplers[samplerId];

            if(!!sampler.wrapT){
                asset.wrapT = this._getTextureWrap(sampler.wrapT);
            }
            else{
                asset.wrapT = ETextureWrapMode.REPEAT;
            }

            if(!!sampler.wrapS){
                asset.wrapS = this._getTextureWrap(sampler.wrapS);
            }
            else{
                asset.wrapS = ETextureWrapMode.REPEAT;
            }

            if(!!sampler.minFilter){
                asset.minFilter = this._getTextureFilter(sampler.minFilter);
            }
            else{
                asset.minFilter = ETextureFilterMode.LINEAR;
            }

            if(!!sampler.magFilter){
                asset.magFilter = this._getTextureFilter(sampler.magFilter);
            }
            else{
                asset.magFilter = ETextureFilterMode.LINEAR;
            }
        }

        private _getTextureFilter(filter:number){
            var textureFilter:ETextureFilterMode = null;

            switch (filter){
                case 9728:
                    textureFilter = ETextureFilterMode.NEAREST;
                    break;
                case 9729:
                    textureFilter = ETextureFilterMode.LINEAR;
                    break;
                case 9984:
                    textureFilter = ETextureFilterMode.NEAREST_MIPMAP_MEAREST;
                    break;
                case 9985:
                    textureFilter = ETextureFilterMode.LINEAR_MIPMAP_NEAREST;
                    break;
                case 9986:
                    textureFilter = ETextureFilterMode.NEAREST_MIPMAP_LINEAR;
                    break;
                case 9987:
                    textureFilter = ETextureFilterMode.LINEAR_MIPMAP_LINEAR;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture filter:${filter}`));
                    break;
            }

            return textureFilter;
        }

        private _getTextureWrap(wrap:number){
            var textureWrap:ETextureWrapMode = null;

            switch (wrap){
                case 33071:
                    textureWrap = ETextureWrapMode.CLAMP_TO_EDGE;
                    break;
                case 33648:
                    textureWrap = ETextureWrapMode.MIRRORED_REPEAT;
                    break;
                case 10497:
                    textureWrap = ETextureWrapMode.REPEAT;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`texture wrap:${wrap}`));
                    break;
            }

            return textureWrap;
        }
    }
}
