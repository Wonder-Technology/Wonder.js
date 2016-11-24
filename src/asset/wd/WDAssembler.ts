module wd{
    export class WDAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<IWDResult> = wdCb.Hash.create<IWDResult>();

        public build(parseData:IWDParseData){
            // this._buildMetadata(parseData);
            this._buildModels(parseData);

            return this._result;
        }

        // private _buildMetadata(parseData:IWDParseData){
        //     var metadata = wdCb.Hash.create<any>();
        //
        //     for(let i in parseData.metadata){
        //         if(parseData.metadata.hasOwnProperty(i)){
        //             metadata.addChild(i, parseData.metadata[i]);
        //         }
        //     }
        //
        //     this._result.addChild("metadata", metadata);
        // }

        private _buildModels(parseData:IWDParseData){
            var models = wdCb.Collection.create<GameObject>(),
                self = this;
            var build = (object:IWDObjectData) => {
                var model = GameObject.create();

                if(object.name){
                    model.name = object.name;
                }

                if(self._isModelContainer(object)){
                    model.addTag(<any>EWDTag.CONTAINER);
                }

                self._addComponentsFromWD(model, object.components);

                model.addComponent(MeshRenderer.create());

                if(object.children){
                    object.children.forEach((child:IWDObjectData) => {
                        model.addChild(build(child));
                    });
                }

                return model;
            };

            if(!parseData.objects){
                return;
            }

            parseData.objects.forEach((object:IWDObjectData) => {
                models.addChild(build(object));
            });

            this._result.addChild("models", models);
        }

        private _isModelContainer(object:IWDObjectData){
            return object.isContainer;
        }

        private _addComponentsFromWD(model:GameObject, components:wdCb.Collection<IWDComponent>){
            var self = this;

            components.forEach((component:IWDComponent) => {
                //todo support
                if(self._isTransform(component)){
                    model.addComponent(self._createTransform(<IWDTransform>component));
                }
                // else if(self._isCamera(component)){
                //     model.addComponent(self._createCamera(<IWDCamera>component));
                // }
                // else if(self._isLight(component)){
                //     model.addComponent(self._createLight(<any>component));
                // }
                if(self._isGeometry(component)){
                    let geometry = self._createGeometry(<any>component);

                    model.addComponent(geometry);

                    if(!!geometry.morphTargets && geometry.morphTargets.getCount() > 0){
                        model.addComponent(MorphAnimation.create());
                    }
                }
                else if(self._isArticulatedAnimation(component)){
                    model.addComponent(self._createArticulatedAnimation(<any>component));
                }
            });
        }

        private _isTransform(component:any){
            return !!component.matrix || !!component.position;
        }
        //
        // private _isCamera(component:any){
        //     return !!component.camera;
        // }
        //
        // private _isLight(component:any){
        //     return !!component.lightColor && !!component.type
        // }

        private _isGeometry(component:any){
            return !!component.material;
        }

        private _isArticulatedAnimation(component:any){
            return WDUtils.isIWDArticulatedAnimation(component);
        }

        private _createTransform(component:IWDTransform){
            var transform:ThreeDTransform = ThreeDTransform.create();

            if(component.matrix){
                transform.localPosition = component.matrix.getTranslation();
                transform.localRotation = component.matrix.getRotation();
                transform.localScale = component.matrix.getScale();
            }
            else{
                transform.localPosition = component.position;
                transform.localRotation = component.rotation;
                transform.localScale = component.scale;
            }

            return transform;
        }
        //
        // private _createCamera(component:IWDCamera){
        //     return BasicCameraController.create(component.camera);
        // }
        //
        // private _createLight(component:IWDLight&IWDPointLight&IWDAmbientLight&IWDDirectionLight){
        //     var light = null;
        //
        //     switch (component.type){
        //         case "ambient":
        //             light = AmbientLight.create();
        //
        //             light.color = component.lightColor;
        //             break;
        //         case "directional":
        //             light = DirectionLight.create();
        //
        //             light.color = component.lightColor;
        //             break;
        //         case "point":
        //             light = PointLight.create();
        //
        //             light.color = component.lightColor;
        //
        //             WDUtils.addData(light, "range", component.distance);
        //             WDUtils.addData(light, "constant", component.constantAttenuation);
        //             WDUtils.addData(light, "linear", component.linearAttenuation);
        //             WDUtils.addData(light, "quadratic", component.quadraticAttenuation);
        //             break;
        //         default:
        //             //todo support spot
        //             break;
        //     }
        //
        //     return light;
        // }

        private _createGeometry(component:IWDGeometry){
            var geometry = ModelGeometry.create();

            geometry.vertices = component.vertices;
            geometry.faces = component.faces;
            WDUtils.addData(geometry, "colors", component.colors);
            WDUtils.addData(geometry, "texCoords", component.texCoords);

            WDUtils.addData(geometry, "morphTargets", component.morphTargets);
            WDUtils.addData(geometry, "morphNormals", component.morphNormals);

            geometry.drawMode = component.drawMode;

            geometry.material = this._createMaterial(component.material);


            return geometry;
        }

        @require(function(materialData:IWDMaterialForAssembler){
            it("material type should always be LightMaterial", () => {
                expect(materialData.type).equals("LightMaterial");
            });
        })
        private _createMaterial(materialData:IWDMaterialForAssembler){
            var material:Material = null;

            switch (materialData.type){
                case "LightMaterial":
                    material = this._createLightMaterial(<IWDLightMaterialForAssembler>materialData);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`material type:${materialData.type}`));
                    break;
            }

            return material;
        }

        private _createLightMaterial(materialData:IWDLightMaterialForAssembler){
            return this._createStandardLightMaterial<LightMaterial>(LightMaterial.create(), materialData);
        }

        private _createStandardLightMaterial<T extends StandardLightMaterial>(material:T, materialData:IWDLightMaterialForAssembler):T{
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

        private _setBasicDataOfMaterial(material:Material, materialData:IWDMaterialForAssembler){
            if(!!materialData.doubleSided && materialData.doubleSided === true){
                material.side = ESide.BOTH;
            }
            else{
                material.side = ESide.FRONT;
            }
        }

        private _createArticulatedAnimation(component:IWDArticulatedAnimation){
             var anim = TransformArticulatedAnimation.create();

            anim.data = wdCb.Hash.create<wdCb.Collection<IWDKeyFrameData>>(component);

            return anim;
        }
    }
}
