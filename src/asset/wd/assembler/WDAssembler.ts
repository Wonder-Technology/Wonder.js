module wd{
    export class WDAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<IWDResultAssembler> = wdCb.Hash.create<IWDResultAssembler>();
        private _geometryAssembler:WDGeometryAssembler = WDGeometryAssembler.create();
        private _transformAssembler:WDTransformAssembler = WDTransformAssembler.create();
        private _lightAssembler:WDLightAssembler = WDLightAssembler.create();

        public build(parseData:IWDParseDataAssembler){
            this._buildMetadata(parseData);
            this._buildModels(parseData);

            return this._result;
        }

        private _buildMetadata(parseData:IWDParseDataAssembler){
            var metadata = wdCb.Hash.create<any>();

            for(let i in parseData.metadata){
                if(parseData.metadata.hasOwnProperty(i)){
                    metadata.addChild(i, parseData.metadata[i]);
                }
            }

            this._result.addChild("metadata", metadata);
        }

        private _buildModels(parseData:IWDParseDataAssembler){
            var models = wdCb.Collection.create<GameObject>(),
                self = this;
            var build = (object:IWDObjectDataAssembler) => {
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
                    object.children.forEach((child:IWDObjectDataAssembler) => {
                        model.addChild(build(child));
                    });
                }

                return model;
            };

            if(!parseData.objects){
                return;
            }

            parseData.objects.forEach((object:IWDObjectDataAssembler) => {
                models.addChild(build(object));
            });

            this._result.addChild("models", models);
        }

        private _isModelContainer(object:IWDObjectDataAssembler){
            return object.isContainer;
        }

        private _addComponentsFromWD(model:GameObject, components:wdCb.Collection<IWDComponentAssembler>){
            var self = this;

            components.forEach((component:IWDComponentAssembler) => {
                if(self._isTransform(<IWDTransformAssembler>component)) {
                    model.addComponent(self._transformAssembler.createComponent(<IWDTransformAssembler>component));
                }
                else if(self._isCamera(<IWDCameraAssembler>component)){
                    model.addComponent(self._createCamera(<IWDCameraAssembler>component));
                }
                else if(self._isLight(<IWDLightAssembler>component)){
                    model.addComponent(self._lightAssembler.createComponent(<IWDLightAssembler>component));
                }
                if(self._isGeometry(<IWDGeometryAssembler>component)){
                    let geometry = self._geometryAssembler.createComponent(<IWDGeometryAssembler>component);

                    model.addComponent(geometry);

                    if(!!geometry.morphVertices && geometry.morphVertices.getCount() > 0){
                        model.addComponent(MorphAnimation.create());
                    }
                }
                else if(self._isArticulatedAnimation(<IWDArticulatedAnimationAssembler>component)){
                    model.addComponent(self._createArticulatedAnimation(<IWDArticulatedAnimationAssembler>component));
                }
            });
        }

        private _isTransform(component:IWDTransformAssembler){
            return !!component.matrix || !!component.position;
        }

        private _isCamera(component:IWDCameraAssembler){
            return !!component.camera;
        }

        private _isLight(component:IWDLightAssembler){
            return !!component.color && !!component.type
        }

        private _isGeometry(component:IWDGeometryAssembler){
            return !!component.material;
        }

        private _isArticulatedAnimation(component:IWDArticulatedAnimationAssembler){
            return WDUtils.isIWDArticulatedAnimationAssembler(component);
        }

        private _createCamera(component:IWDCameraAssembler){
            return BasicCameraController.create(component.camera);
        }

        private _createArticulatedAnimation(component:IWDArticulatedAnimationAssembler){
             var anim = TransformArticulatedAnimation.create();

            anim.data = wdCb.Hash.create<wdCb.Collection<IWDKeyFrameDataAssembler>>(component);

            return anim;
        }
    }
}
