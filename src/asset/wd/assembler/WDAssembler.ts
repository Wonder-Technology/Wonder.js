module wd{
    export class WDAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _geometryAssembler:WDGeometryAssembler = WDGeometryAssembler.create();
        private _transformAssembler:WDTransformAssembler = WDTransformAssembler.create();
        private _lightAssembler:WDLightAssembler = WDLightAssembler.create();

        public build(parseData:IWDParseDataAssembler){
            this._buildMetadata(parseData);
            this._buildModels(parseData);

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.AFTER_SCENEGRAPH_BUILD));

            return this._result;
        }

        private _buildMetadata(parseData:IWDParseDataAssembler){
            var metadata:IWDMetadataAssembler = <IWDMetadataAssembler>{};

            for(let i in parseData.metadata){
                if(parseData.metadata.hasOwnProperty(i)){
                    metadata[i] = parseData.metadata[i];
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

                self._addComponentsFromwd(model, object.components);

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

        private _addComponentsFromwd(model:GameObject, components:wdCb.Collection<IWDComponentAssembler>){
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
                else if(self._isGeometry(<IWDGeometryAssembler>component)){
                    let geometry = self._geometryAssembler.createComponent(<IWDGeometryAssembler>component);

                    model.addComponent(geometry);

                    if(!!geometry.morphVertices && geometry.morphVertices.getCount() > 0){
                        let MorphAnimation = ClassUtils.getClass("MorphAnimation");

                        if(MorphAnimation !== void 0){
                            model.addComponent(MorphAnimation.create());
                        }
                    }
                }
                else if(self._isKeyFrameAnimation(<IWDKeyFrameAnimationAssembler>component)){
                    let TransformArticulatedAnimation = ClassUtils.getClass("TransformArticulatedAnimation");

                    if(TransformArticulatedAnimation !== void 0){
                        model.addComponent(self._createKeyFrameAnimation(<IWDKeyFrameAnimationAssembler>component, TransformArticulatedAnimation));
                    }
                }
                else if(self._isSkinSkeleton(<IWDSkinSkeletonAnimationAssembler>component)){
                    let SkinSkeletonAnimation = ClassUtils.getClass("SkinSkeletonAnimation");

                    if(SkinSkeletonAnimation !== void 0){
                        model.addComponent(self._createSkinSkeletonAnimation(<IWDSkinSkeletonAnimationAssembler>component, SkinSkeletonAnimation));
                    }
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

        private _isKeyFrameAnimation(component:IWDKeyFrameAnimationAssembler){
            return WDUtils.isIWDKeyFrameAnimationAssembler(component);
        }

        private _isSkinSkeleton(component:IWDSkinSkeletonAnimationAssembler){
            return !!component.jointNames;
        }

        private _createCamera(component:IWDCameraAssembler){
            return BasicCameraController.create(component.camera);
        }

        private _createKeyFrameAnimation(component:IWDKeyFrameAnimationAssembler, TransformArticulatedAnimation:any){
             var anim = TransformArticulatedAnimation.create();

            anim.data = wdCb.Hash.create<wdCb.Collection<IWDKeyFrameDataAssembler>>(component);

            return anim;
        }

        private _createSkinSkeletonAnimation(component:IWDSkinSkeletonAnimationAssembler, SkinSkeletonAnimation:any){
            var anim = SkinSkeletonAnimation.create();

            anim.bindShapeMatrix = component.bindShapeMatrix;
            anim.inverseBindMatrices = component.inverseBindMatrices;
            anim.boneMatrixMap = component.boneMatrixMap;
            anim.jointNames = component.jointNames;
            anim.jointTransformData = component.jointTransformData;

            return anim;
        }
    }
}
