module wd{
    export class GLTFAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<IGLTFResult> = wdCb.Hash.create<IGLTFResult>();

        //todo geometry add drawMode

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
            var build = (objects:wdCb.Collection<IGLTFObjectData>) => {
                objects.forEach((object:IGLTFObjectData) => {
                    var model = GameObject.create();

                    if(object.name){
                        model.name = object.name;
                    }

                    if(self._isModelContainer(object)){
                        model.addTag(<any>WDTag.CONTAINER);
                    }

                    self._addComponents(model, object.components);
                    //
                    //geometry = ModelGeometry.create();
                    //geometry.vertices = object.vertices;
                    //geometry.faces = object.faces;
                    //geometry.texCoords = object.uvs;
                    //geometry.colors = object.colors;
                    //
                    //
                    //if(object.material){
                    //    geometry.material = self._buildMaterial(object.material, parseData.materials);
                    //}
                    //
                    //geometry.morphTargets = object.morphTargets;
                    //geometry.morphFaceNormals = object.morphNormals;
                    //geometry.morphVertexNormals = object.morphNormals;
                    //
                    //if(GeometryUtils.hasData(geometry.morphTargets)){
                    //    model.addComponent(MorphAnimation.create());
                    //}
                    //
                    //model.addComponent(geometry);
                    //
                    //model.name = object.name;
                    //model.addComponent(MeshRenderer.create());
                    models.addChild(model);

                    if(object.children){
                        build(object.children);
                    }
                });
            };

            if(!parseData.objects){
                return;
            }

            build(parseData.objects);

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
            });
        }

        private _isTransform(component:any){
            return !!component.matrix || !!component.position;
        }

        private _createTransform(component:IGLTFTransform){
            var transform:ThreeDTransform = ThreeDTransform.create();

            if(component.matrix){
                transform.localToWorldMatrix = component.matrix;
            }
            else{
                transform.position = component.position;
                transform.rotation = component.rotation;
                transform.scale = component.scale;
            }

            return transform;
        }
    }
}
