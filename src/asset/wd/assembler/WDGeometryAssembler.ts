module wd{
    export class WDGeometryAssembler extends WDComponentAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public createComponent(component:IWDGeometryAssembler):ModelGeometry{
            var geometry = ModelGeometry.create();

            geometry.vertices = component.vertices;
            geometry.faces = component.faces;
            WDUtils.addData(geometry, "colors", component.colors);
            WDUtils.addData(geometry, "texCoords", component.texCoords);


            WDUtils.addData(geometry, "jointIndices", component.jointIndices);
            WDUtils.addData(geometry, "jointWeights", component.jointWeights);

            WDUtils.addData(geometry, "morphVertices", component.morphVertices);
            WDUtils.addData(geometry, "morphNormals", component.morphNormals);

            geometry.drawMode = component.drawMode;

            geometry.material = this._createMaterial(component.material);


            return geometry;
        }

        @require(function(materialData:IWDMaterialAssembler){
            it("material type should always be LightMaterial", () => {
                expect(materialData.type).equals("LightMaterial");
            });
        })
        private _createMaterial(materialData:IWDMaterialAssembler){
            var material:Material = null;

            switch (materialData.type){
                case "LightMaterial":
                    material = this._createLightMaterial(<IWDLightMaterialAssembler>materialData);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`material type:${materialData.type}`));
                    break;
            }

            return material;
        }

        private _createLightMaterial(materialData:IWDLightMaterialAssembler){
            return this._createStandardLightMaterial<LightMaterial>(LightMaterial.create(), materialData);
        }

        private _createStandardLightMaterial<T extends StandardLightMaterial>(material:T, materialData:IWDLightMaterialAssembler):T{
            this._setBasicDataOfMaterial(material, materialData);

            if(materialData.transparent === true && materialData.opacity !== void 0){
                material.opacity = materialData.opacity;
                material.blendType = EBlendType.NORMAL;
            }

            if(materialData.lightModel === ELightModel.LAMBERT){
                Log.log(Log.info.FUNC_NOT_SUPPORT("LAMBERT light model, use PHONG light model instead"));
                material.lightModel = ELightModel.PHONG;
            }
            else{
                material.lightModel = materialData.lightModel;
            }

            WDUtils.addData(material, "color", materialData.diffuseColor);
            WDUtils.addData(material, "specularColor", materialData.specularColor);
            WDUtils.addData(material, "emissionColor", materialData.emissionColor);

            WDUtils.addData(material, "diffuseMap", materialData.diffuseMap);
            WDUtils.addData(material, "specularMap", materialData.specularMap);
            WDUtils.addData(material, "emissionMap", materialData.emissionMap);

            WDUtils.addData(material, "lightMap", materialData.lightMap);
            WDUtils.addData(material, "normalMap", materialData.normalMap);

            WDUtils.addData(material, "shininess", materialData.shininess);

            return material;
        }

        private _setBasicDataOfMaterial(material:Material, materialData:IWDMaterialAssembler){
            if(!!materialData.doubleSided && materialData.doubleSided === true){
                material.side = ESide.BOTH;
            }
            else{
                material.side = ESide.FRONT;
            }
        }
    }
}