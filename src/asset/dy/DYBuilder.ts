/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DYBuilder{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _result:dyCb.Hash<DYFileResult> = dyCb.Hash.create<DYFileResult>();

        public build(parseData:DYFileParseData):dyCb.Hash<DYFileResult>{
            this._buildMetadata(parseData);
            this._buildScene(parseData);
            this._buildModels(parseData);

            return this._result;
        }


        private _buildMetadata(parseData:DYFileParseData){
            var metadata = dyCb.Hash.create<any>();

            for(let i in parseData.metadata){
                if(parseData.metadata.hasOwnProperty(i)){
                    metadata.addChild(i, parseData.metadata[i]);
                }
            }

            this._result.addChild("metadata", metadata);
        }

        private _buildScene(parseData:DYFileParseData){
            var scene = dyCb.Hash.create<any>();

            if(parseData.scene.ambientColor){
                scene.addChild("ambientColor", parseData.scene.ambientColor);
            }

            this._result.addChild("scene", scene);
        }

        private _buildModels(parseData:DYFileParseData){
            var models = dyCb.Collection.create<GameObject>(),
                build = null;

            build = (objects:DYFileParseObjectData, models:{addChild:Function}) => {
                //for(let i in parseData.objects){
                    for(let i in objects){
                    if(objects.hasOwnProperty(i)){
                        let object = objects[i],
                            geometry = ModelGeometry.create(),
                            model = GameObject.create();

                        //geometry.vertices = object.vertices;
                        //geometry.indices = object.indices;
                        //geometry.normals = object.normals;
                        //geometry.texCoords = object.uvs;
                        //geometry.colors = object.colors;
                        geometry.vertices = this._findData(object, "vertices");
                        geometry.indices = this._findData(object, "indices");
                        geometry.normals = this._findData(object, "normals");
                        geometry.texCoords = this._findData(object, "uvs");
                        geometry.colors = this._findData(object, "colors");

                        //todo remove
                        geometry.isDY = true;

                        geometry.material = this._buildMaterial(object.material, parseData.materials);

                        //todo build animation

                        //model = GameObject.create();
                        model.name = object.name;
                        model.addComponent(MeshRenderer.create());
                        model.addComponent(geometry);
                        //
                        models.addChild(model);

                        if(object.children){
                            build(object.children, model);
                            //for(let j in object.children){
                            //    if(object.children.hasOwnProperty(j)){
                            //        let child = <any>object.children[j];
                            //
                            //        //child.parent = object;
                            //    }
                            //}
                        }
                    }
                }
            };

            build(parseData.objects, models);

            this._result.addChild("models", models);
        }

        private _findData(object:DYFileParseObjectData, dataName:string){
            var data = null;

            do{
                data = object[dataName];
            }
            while(!data && (object = object.parent) !== null);

            //if(data instanceof dyCb.Collection){
            return data;
            //}
            //
            //return dyCb.Collection.create<number>(data);
        }

        private _buildMaterial(materialName:string, materials: dyCb.Hash<DYFileParseMaterialData>){
            const DEFAULTYPE = "LightMaterial";
            var materialData = null,
                type = null,
                material = null;

            [,materialData] = materials.findOne((material:DYFileParseMaterialData, name:string) => {
                return name === materialName;
            });

            type = materialData.type || DEFAULTYPE;

            dyCb.Log.error(!dy[type], dyCb.Log.info.FUNC_NOT_EXIST(`materialClass:${type}`));

            material = dy[type].create();

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

