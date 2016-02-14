module wd{
    export class GLTFAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<IGLTFResult> = wdCb.Hash.create<IGLTFResult>();

        public build(parseData:IGLTFParseData){
            this._buildMetadata(parseData);
            this._buildModels(parseData);

            return this._result;
        }

        private _buildMetadata(parseData:IGLTFParseData){
            var metadata = wdCb.Hash.create<any>();

            for(let i in parseData.metadata){
                if(parseData.metadata.hasOwnProperty(i)){
                    metadata.addChild(i, parseData.metadata[i]);
                }
            }

            this._result.addChild("metadata", metadata);
        }

        private _buildModels(parseData:IGLTFParseData){
            var models = wdCb.Collection.create<GameObject>(),
                self = this;
            var build = (object:IGLTFObjectData) => {
                var model = GameObject.create();

                if(object.name){
                    model.name = object.name;
                }

                if(self._isModelContainer(object)){
                    model.addTag(<any>EWDTag.CONTAINER);
                }

                self._addComponents(model, object.components);

                model.addComponent(MeshRenderer.create());

                if(object.children){
                    object.children.forEach((child:IGLTFObjectData) => {
                        model.addChild(build(child));
                    })
                }

                return model;
            };

            if(!parseData.objects){
                return;
            }

            parseData.objects.forEach((object:IGLTFObjectData) => {
                models.addChild(build(object));
            });

            this._result.addChild("models", models);
        }

        private _isModelContainer(object:IGLTFObjectData){
            return object.isContainer;
        }

        private _addComponents(model:GameObject, components:wdCb.Collection<IGLTFComponent>){
            var self = this;

            components.forEach((component:IGLTFComponent) => {
                if(self._isTransform(component)){
                    model.transform = self._createTransform(<IGLTFTransform>component);
                }
                else if(self._isCamera(component)){
                    model.addComponent(self._createCamera(<IGLTFCamera>component));
                }
                else if(self._isLight(component)){
                    model.addComponent(self._createLight(<any>component));
                }
                else if(self._isGeometry(component)){
                    model.addComponent(self._createGeometry(<any>component));
                }
                else if(self._isArticulatedAnimation(component)){
                    model.addComponent(self._createArticulatedAnimation(<any>component));
                }
            });
        }

        private _isTransform(component:any){
            return !!component.matrix || !!component.position;
        }

        private _isCamera(component:any){
            return !!component.camera;
        }

        private _isLight(component:any){
            return !!component.lightColor && !!component.type
        }

        private _isGeometry(component:any){
            return !!component.material;
        }

        private _isArticulatedAnimation(component:any){
            return GLTFUtils.isIGLTFArticulatedAnimation(component);
        }

        private _createTransform(component:IGLTFTransform){
            var transform:ThreeDTransform = ThreeDTransform.create();

            if(component.matrix){
                transform.position = component.matrix.getTranslation();
                transform.rotation = component.matrix.getRotation();
                transform.scale = component.matrix.getScale();
            }
            else{
                transform.position = component.position;
                transform.rotation = component.rotation;
                transform.scale = component.scale;
            }

            return transform;
        }

        private _createCamera(component:IGLTFCamera){
            return BasicCameraController.create(component.camera);
        }

        private _createLight(component:IGLTFLight&IGLTFPointLight&IGLTFAmbientLight&IGLTFDirectionLight){
            var light = null;

            switch (component.type){
                case "ambient":
                    light = AmbientLight.create();

                    light.color = component.lightColor;
                    break;
                case "directional":
                    light = DirectionLight.create();

                    light.color = component.lightColor;
                    break;
                case "point":
                    light = PointLight.create();

                    light.color = component.lightColor;

                    GLTFUtils.addData(light, "range", component.distance);
                    GLTFUtils.addData(light, "constant", component.constantAttenuation);
                    GLTFUtils.addData(light, "linear", component.linearAttenuation);
                    GLTFUtils.addData(light, "quadratic", component.quadraticAttenuation);
                    break;
                default:
                    //todo support spot
                    break;
            }

            return light;
        }

        private _createGeometry(component:IGLTFGeometry){
            var geometry = ModelGeometry.create();

            geometry.vertices = component.vertices;
            geometry.faces = component.faces;
            GLTFUtils.addData(geometry, "colors", component.colors);
            GLTFUtils.addData(geometry, "texCoords", component.texCoords);

            geometry.drawMode = component.drawMode;

            geometry.material = this._createMaterial(component.material);

            //todo support morph targets

            return geometry;
        }

        private _createMaterial(materialData:IGLTFMaterial){
            var material:Material = null;

            switch (materialData.type){
                case "BasicMaterial":
                    material = this._createBasicMaterial(<IGLTFBasicMaterial>materialData);
                    break;
                case "LightMaterial":
                    material = this._createLightMaterial(<IGLTFLightMaterial>materialData);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`material type:${materialData.type}`));
                    break;
            }

            return material;
        }

        private _createBasicMaterial(materialData:IGLTFBasicMaterial){
            var material = BasicMaterial.create();

            this._setBasicDataOfMaterial(material, materialData);

            return material;
        }

        private _createLightMaterial(materialData:IGLTFLightMaterial){
            var material = LightMaterial.create();

            this._setBasicDataOfMaterial(material, materialData);

            if(!!materialData.transparent && materialData.transparent === true && materialData.opacity){
                material.opacity = materialData.opacity;
            }

            if(materialData.lightModel === LightModel.LAMBERT){
                Log.log(Log.info.FUNC_NOT_SUPPORT("LAMBERT light model, use PHONG light model instead"));
                material.lightModel = LightModel.PHONG;
            }
            else{
                material.lightModel = materialData.lightModel;
            }

            GLTFUtils.addData(material, "color", materialData.diffuseColor);
            GLTFUtils.addData(material, "specularColor", materialData.specularColor);
            GLTFUtils.addData(material, "emissionColor", materialData.emissionColor);

            GLTFUtils.addData(material, "diffuseMap", materialData.diffuseMap);
            GLTFUtils.addData(material, "specularMap", materialData.specularMap);
            GLTFUtils.addData(material, "emissionMap", materialData.emissionMap);

            GLTFUtils.addData(material, "shininess", materialData.shininess);

            return material;
        }

        private _setBasicDataOfMaterial(material:Material, materialData:IGLTFMaterial){
            if(!!materialData.doubleSided && materialData.doubleSided === true){
                material.side = Side.BOTH;
            }
            else{
                material.side = Side.FRONT;
            }
        }

        private _createArticulatedAnimation(component:IGLTFArticulatedAnimation){
             var anim = ArticulatedAnimation.create();

            anim.data = wdCb.Hash.create<wdCb.Collection<IGLTFKeyFrameData>>(component);

            return anim;
        }
    }
}
