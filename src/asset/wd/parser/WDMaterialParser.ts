module wd{
    export class WDMaterialParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _imageMap:wdCb.Hash<HTMLImageElement> = null;
        private _json:IWDJsonData = null;
        private _glTextureMap:wdCb.Hash<WebGLTexture> = wdCb.Hash.create<WebGLTexture>();
        private _textureParser:WDTextureParser = WDTextureParser.create();

        public parse(json:IWDJsonData, materialId:string, imageMap:wdCb.Hash<HTMLImageElement>):IWDMaterialForAssembler{
            var materialData = null;

            if(!materialId){
                return this._getDefaultMaterialData();
            }

            this._json = json;
            this._imageMap = imageMap;

            this._textureParser.json = this._json;
            this._textureParser.imageMap = this._imageMap;
            this._textureParser.glTextureMap = this._glTextureMap;

            let material:IWDLightMaterialForAssembler = <any>{};

            materialData = json.materials[materialId];

            WDUtils.addData(material, "doubleSided", materialData.doubleSided);
            WDUtils.addData(material, "transparent", Boolean(materialData.transparent));
            WDUtils.addData(material, "opacity", materialData.transparency);

            //todo parse jointCount

            material.type = this._getMaterialType(materialData.technique);

            material.lightModel = this._getLightModel(materialData.technique);

            this._addMaterialValues(material, materialData.values);

            return material;
        }

        private _getDefaultMaterialData(){
            return {
                type:"LightMaterial",
                lightModel:ELightModel.PHONG
            }
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
                mapName = !!mapName ? mapName : `${colorName}Map`;

                material[mapName] = this._textureParser.getTexture(<string>colorData);
            }
        }

        private _addMaterialLightMap(material:IWDMaterialForAssembler, mapName:string, mapId:string){
            if(!mapId){
                return;
            }

            material[mapName] = this._textureParser.getTexture(mapId);
        }
    }
}

