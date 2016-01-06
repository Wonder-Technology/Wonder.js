module wd {
    export class WDBuilder{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _result:wdCb.Hash<DYFileResult> = wdCb.Hash.create<DYFileResult>();

        public build(parseData:DYFileParseData):wdCb.Hash<DYFileResult>{
            this._buildMetadata(parseData);
            this._buildScene(parseData);
            this._buildModels(parseData);

            return this._result;
        }


        private _buildMetadata(parseData:DYFileParseData){
            var metadata = wdCb.Hash.create<any>();

            for(let i in parseData.metadata){
                if(parseData.metadata.hasOwnProperty(i)){
                    metadata.addChild(i, parseData.metadata[i]);
                }
            }

            this._result.addChild("metadata", metadata);
        }

        private _buildScene(parseData:DYFileParseData){
            var scene = wdCb.Hash.create<any>();

            if(parseData.scene.ambientColor){
                scene.addChild("ambientColor", parseData.scene.ambientColor);
            }

            this._result.addChild("scene", scene);
        }

        private _buildModels(parseData:DYFileParseData){
            var models = wdCb.Collection.create<GameObject>(),
                self = this,
                build = null;

            build = (objects:wdCb.Collection<DYFileParseObjectData>, models:{addChild:Function}) => {
                objects.forEach((object:DYFileParseObjectData) => {
                    var geometry = null,
                        model = null;

                    model = GameObject.create();

                    if(!self._isModelContainer(object)){
                        geometry = ModelGeometry.create();
                        geometry.vertices = object.vertices;
                        geometry.faces = object.faces;
                        geometry.texCoords = object.uvs;
                        geometry.colors = object.colors;


                        if(object.material){
                            geometry.material = self._buildMaterial(object.material, parseData.materials);
                        }

                        geometry.morphTargets = object.morphTargets;
                        geometry.morphFaceNormals = object.morphNormals;
                        geometry.morphVertexNormals = object.morphNormals;

                        if(GeometryUtils.hasData(geometry.morphTargets)){
                            model.addComponent(MorphAnimation.create());
                        }

                        model.addComponent(geometry);
                    }

                    model.name = object.name;
                    model.addComponent(MeshRenderer.create());
                    models.addChild(model);

                    if(object.children){
                        build(object.children, model);
                    }
                });
            };

            build(parseData.objects, models);

            this._result.addChild("models", models);
        }

        private _isModelContainer(object:DYFileParseObjectData){
            return object.isContainer;
        }

        private _buildMaterial(materialName:string, materials: wdCb.Hash<DYFileParseMaterialData>){
            const DEFAULTYPE = "LightMaterial";
            var materialData = null,
                type = null,
                material = null;

            [,materialData] = materials.findOne((material:DYFileParseMaterialData, name:string) => {
                return name === materialName;
            });

            type = materialData.type || DEFAULTYPE;

            wdCb.Log.error(!wd[type], wdCb.Log.info.FUNC_NOT_EXIST(`materialClass:${type}`));

            material = wd[type].create();

            material.name = materialName;

            if (materialData.diffuseColor) {
                material.color = materialData.diffuseColor;
            }
            if (materialData.specularColor) {
                material.specular = materialData.specularColor;
            }

            if (materialData.diffuseMap) {
                material.diffuseMap = materialData.diffuseMap;
            }
            if (materialData.specularMap) {
                material.specularMap = materialData.specularMap;
            }
            if (materialData.normalMap) {
                material.normalMap = materialData.normalMap;
            }

            if (materialData.shininess !== null) {
                material.shininess = materialData.shininess;
            }

            if (materialData.opacity !== null) {
                material.opacity = materialData.opacity;
            }

            return material;
        }
    }
}

