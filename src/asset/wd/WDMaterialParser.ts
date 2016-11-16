module wd{
    export class WDMaterialParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        private _glTextureMap:wdCb.Hash<WebGLTexture> = wdCb.Hash.create<WebGLTexture>();

        public parse(json:IWDJsonData, materialId:string, imageMap:wdCb.Hash<HTMLImageElement>):IWDMaterialForAssembler{
            var materialData = null;
                // materialExtension = null;

            this._json = json;
            this._imageMap = imageMap;

            // if(!this._isUseKHRMaterialExtension()){
            //     Log.log("no KHR_materials_common extension found, will use default material instead");
            //
            //     let material:IWDBasicMaterial = {
            //         type:"BasicMaterial",
            //
            //         doubleSided:false
            //     };
            //
            //     return material;
            // }

            let material:IWDLightMaterialForAssembler = <any>{};

            materialData = json.materials[materialId];

            // Log.error(!materialData.extensions || !materialData.extensions.KHR_materials_common, Log.info.FUNC_SHOULD("materials", "define KHR_materials_common extensions"));

            // materialExtension = materialData.extensions.KHR_materials_common;

            WDUtils.addData(material, "doubleSided", materialData.doubleSided);
            WDUtils.addData(material, "transparent", Boolean(materialData.transparent));
            WDUtils.addData(material, "opacity", materialData.transparency);

            //todo parse jointCount

            material.type = this._getMaterialType(materialData.technique);

            material.lightModel = this._getLightModel(materialData.technique);

            this._addMaterialValues(material, materialData.values);

            return material;
        }

        // private _isUseKHRMaterialExtension(){
        //     var extensionsUsed = this._json.extensionsUsed;
        //
        //     if(!extensionsUsed){
        //         return false;
        //     }
        //
        //     return extensionsUsed.indexOf("KHR_materials_common") > -1;
        // }

        private _getMaterialType(technique:string){
            var type:string = null;

            switch (technique){
                case "PHONG":
                case "BLINN":
                case "CONSTANT":
                case "LAMBERT":
                    type = "LightMaterial";
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`technique:${technique}`));
                    break;
            }

            return type;
        }

        private _getLightModel(technique:string){
            var model:ELightModel = null;

            switch (technique){
                case "PHONG":
                    model = ELightModel.PHONG;
                    break;
                case "BLINN":
                    model = ELightModel.BLINN;
                    break;
                case "CONSTANT":
                    model = ELightModel.CONSTANT;
                    break;
                case "LAMBERT":
                    model = ELightModel.LAMBERT;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`technique:${technique}`));
                    break;
            }

            return model;
        }

        private _addMaterialValues(material:IWDLightMaterialForAssembler, values:any){
            if(!values){
                return;
            }

            this._addMaterialLightColor(material, "diffuse", values.diffuse);
            this._addMaterialLightColor(material, "specular", values.specular);
            this._addMaterialLightColor(material, "emission", values.emission);
            this._addMaterialLightColor(material, "reflective", values.ambient, "reflectionMap");

            this._addMaterialLightMap(material, "lightMap", values.lightMap);
            this._addMaterialLightMap(material, "normalMap", values.normalMap);

            if(!!values.shininess){
                material.shininess = values.shininess;
            }
        }

        private _addMaterialLightColor(material:IWDLightMaterialForAssembler, colorName:string, colorData:Array<number>|string, mapName?:string){
            if(!colorData){
                return;
            }

            if(JudgeUtils.isArrayExactly(colorData)){
                material[`${colorName}Color`] = WDUtils.getColor(<Array<number>>colorData);
            }
            else{
                // if(this._isColor(colorData.type)){
                //     material[`${colorName}Color`] = WDUtils.getColor(colorData.value);
                // }
                // else{
                mapName = !!mapName ? mapName : `${colorName}Map`;

                material[mapName] = this._getTexture(<string>colorData);
                // }
            }
        }

        private _addMaterialLightMap(material:IWDMaterialForAssembler, mapName:string, mapId:string){
            if(!mapId){
                return;
            }

            material[mapName] = this._getTexture(mapId);
        }

        // private _isColor(type:number){
        //     return Number(type) === 35666;
        // }

        //@require(function(textureId:string){
        //assert(!!this._json.textures[textureId], Log.info.FUNC_NOT_EXIST(`textureId:${textureId}`));
        //})
        private _getTexture(textureDataId:string):Texture{
            var textureData:IWDTexture = null,
                asset:TextureAsset = null;

            if(!this._json.textures || !this._json.textures[textureDataId]) {
                return null;
            }

            textureData = this._json.textures[textureDataId];

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

            if(this._glTextureMap.hasChild(key)){
                return this._glTextureMap.getChild(key);
            }

            glTexture = DeviceManager.getInstance().gl.createTexture();

            this._glTextureMap.addChild(key, glTexture);

            return glTexture;
        }

        private _buildGLTextureMapKey(asset:TextureAsset, sourceId:string){
            return `${sourceId}_${asset.wrapS}_${asset.wrapT}_${asset.magFilter}_${asset.minFilter}`;
        }

        private _createTextureAsset(target:number, imageId:string){
            var asset:TextureAsset = null,
                source = this._imageMap.getChild(imageId);

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
            assert(!!this._json.samplers[samplerId], Log.info.FUNC_NOT_EXIST(`samplerId:${samplerId}`));
        })
        private _addTextureSampler(asset:TextureAsset, samplerId:string){
            var sampler = this._json.samplers[samplerId];

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

