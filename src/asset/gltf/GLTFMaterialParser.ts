module wd{
    export class GLTFMaterialParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IGLTFJsonData = null;

        public parse(json:IGLTFJsonData, materialId:string, imageMap:wdCb.Hash<HTMLImageElement>):IGLTFMaterial{
            var materialData = null,
                materialExtension = null;

            this._json = json;
            this._imageMap = imageMap;

            if(!this._isUseKHRMaterialExtension()){
                Log.log("no KHR_materials_common extension found, will use default material instead");

                let material:IGLTFBasicMaterial = {
                    type:"BasicMaterial",

                    doubleSided:false
                };

                return material;
            }

            let material:IGLTFLightMaterial = <any>{};

            materialData = json.materials[materialId];

            Log.error(!materialData.extensions || !materialData.extensions.KHR_materials_common, Log.info.FUNC_SHOULD("materials", "define KHR_materials_common extensions"));

            materialExtension = materialData.extensions.KHR_materials_common;

            GLTFUtils.addData(material, "doubleSided", materialExtension.doubleSided);
            GLTFUtils.addData(material, "transparent", materialExtension.transparent);
            GLTFUtils.addData(material, "opacity", materialExtension.transparency);

            //todo parse jointCount

            material.type = this._getMaterialType(materialExtension.technique);

            material.lightModel = this._getLightModel(materialExtension.technique);

            this._addMaterialExtensionValues(material, materialExtension.values);


            return material;
        }

        private _isUseKHRMaterialExtension(){
            var extensionsUsed = this._json.extensionsUsed;

            if(!extensionsUsed){
                return false;
            }

            return extensionsUsed.indexOf("KHR_materials_common") > -1;
        }

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

        private _addMaterialExtensionValues(material:IGLTFLightMaterial, values:any){
            if(!values){
                return;
            }

            if(values.ambient){
                Log.warn(Log.info.FUNC_NOT_SUPPORT("ambient of material"));
            }

            this._addMaterialLightColor(material, "diffuse", values.diffuse);
            this._addMaterialLightColor(material, "specular", values.specular);
            this._addMaterialLightColor(material, "emission", values.emission);

            if(values.shininess){
                material.shininess = values.shininess.value;
            }
        }

        private _addMaterialLightColor(material:IGLTFMaterial, colorName:string, colorData:{type;value}&Array<number>){
            if(!colorData){
                return;
            }

            if(JudgeUtils.isArrayExactly(colorData)){
                material[`${colorName}Color`] = GLTFUtils.getColor(colorData);
            }
            else{
                if(this._isColor(colorData.type)){
                    material[`${colorName}Color`] = GLTFUtils.getColor(colorData.value);
                }
                else{
                    material[`${colorName}Map`] = this._getTexture(colorData.value);
                }
            }
        }

        private _isColor(type:number){
            return Number(type) === 35666;
        }

        //@require(function(textureId:string){
        //assert(!!this._json.textures[textureId], Log.info.FUNC_NOT_EXIST(`textureId:${textureId}`));
        //})
        private _getTexture(textureId:string):Texture{
            var texture = null,
                asset:TextureAsset = null;

            if(!this._json.textures || !this._json.textures[textureId]) {
                return null;
            }


            texture = this._json.textures[textureId];

            asset = this._createTextureAsset(texture.target, texture.source);


            if(texture.internalFormat !== texture.format){
                Log.warn(`texture.internalFormat(${texture.internalFormat}) !== texture.format(${texture.format}), here take texture.format value as their value`);
            }

            if(texture.format){
                asset.format = this._getTextureFormat(texture.format);
            }

            if(texture.type){
                asset.type = this._getTextureType(texture.type);
            }

            this._addTextureSampler(asset, texture.sampler);

            return asset.toTexture();
        }

        private _createTextureAsset(target:number, imageId:string){
            var asset:TextureAsset = null,
                source = this._imageMap.getChild(imageId);

            if(!source){
                Log.warn(`no image found in loader(id:${imageId})`);
            }

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

            asset.wrapT = this._getTextureWrap(sampler.wrapT);
            asset.wrapS = this._getTextureWrap(sampler.wrapS);
            asset.minFilter = this._getTextureFilter(sampler.minFilter);
            asset.magFilter = this._getTextureFilter(sampler.magFilter);
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

