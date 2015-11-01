/// <reference path="../../definitions.d.ts"/>
module dy {
    //todo support multi materials
    export class OBJLoader extends Loader {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        public get(id:string):GameObject {
            var obj:GameObject = super.get(id);

            obj.name = id;

            return obj;
        }

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        @In(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var url = args[0];

            return OBJFileLoader.create().load(url);
        }
    }

    class OBJFileLoader {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mtlFileLoader:MTLLoader = MTLLoader.create();
        private _objParser:OBJParser = OBJParser.create();

        public load(url:string):dyRt.Stream {
            var self = this;

            return AjaxLoader.load(url, "text")
                .do((data:any) => {
                    self._objParser.parse(data);
                }, null, null)
                .concat(
                    [
                        dyRt.defer(() => {
                            return self._mtlFileLoader.load(self._getMtlFilePath(url));
                        }),
                        dyRt.callFunc(()=> {
                            return self._buildModel();
                        })
                    ]
                );
        }

        private _getMtlFilePath(objFilePath:string) {
            if (this._objParser.mtlFilePath === null) {
                return null;
            }

            return ModelLoaderUtils.getPath(objFilePath, this._objParser.mtlFilePath);
        }

        private _buildModel():GameObject {
            var result = GameObject.create();

            this._objParser.objects.forEach((object:ObjectModel) => {
                var geometry = ModelGeometry.create(),
                    model = null;

                geometry.vertices = object.vertices;
                geometry.indices = object.indices;
                geometry.normals = object.normals;
                geometry.texCoords = object.texCoords;


                geometry.material = this._buildMaterial(object);

                model = GameObject.create();
                model.name = object.name;
                model.addComponent(MeshRenderer.create());
                model.addComponent(geometry);

                result.addChild(model);
            });

            return result;
        }

        private _buildMaterial(object:ObjectModel){
            var material = LightMaterial.create(),
                materialModel:MaterialModel = null,
                materials = this._mtlFileLoader.materials;

            materialModel = materials.findOne((material:MaterialModel) => {
                return material.name === object.materialName;
            });

            dyCb.Log.error(!materialModel, `can't find material:${object.materialName} in mtl file`);


            if (materialModel.diffuseColor) {
                material.color = materialModel.diffuseColor;
            }
            if (materialModel.specularColor) {
                material.specular = materialModel.specularColor;
            }

            if (materialModel.diffuseMap) {
                material.diffuseMap = materialModel.diffuseMap;
            }
            if (materialModel.specularMap) {
                material.specularMap = materialModel.specularMap;
            }
            if (materialModel.bumpMap) {
                material.normalMap = materialModel.bumpMap;
            }

            if (materialModel.shininess !== null) {
                material.shininess = materialModel.shininess;
            }

            if (materialModel.opacity !== null) {
                material.opacity = materialModel.opacity;
            }

            return material;
        }
    }

    class MTLLoader {
        public static create() {
            var obj = new this();

            return obj;
        }

        get materials() {
            return this._mtlParser.materials;
        }

        private _mtlParser:MTLParser = MTLParser.create();

        public load(url:string):dyRt.Stream {
            var self = this;

            return AjaxLoader.load(url, "text")
                //todo flatMap?
                .do((data:string) => {
                    self._mtlParser.parse(data);
                })
                .concat(
                        dyRt.defer(() => {
                            return self.createLoadMapStream(url)
                        })
                );
        }

        public createLoadMapStream(mtlFilePath:string) {
            var streamArr = [];

            this.materials.map((material:MaterialModel) => {
                var mapUrlArr = [];

                if (material.diffuseMapUrl) {
                    mapUrlArr.push(["diffuseMap", material.diffuseMapUrl]);
                }
                if (material.specularMapUrl) {
                    mapUrlArr.push(["specularMap", material.specularMapUrl]);
                }
                if (material.bumpMapUrl) {
                    mapUrlArr.push(["bumpMap", material.bumpMapUrl]);
                }

                streamArr.push(
                    dyRt.fromArray(mapUrlArr)
                        .flatMap(([type, mapUrl]) => {
                            return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(mtlFilePath, mapUrl))
                                .do((asset:TextureAsset) => {
                                    material[type] = asset.toTexture();
                                }, null, null);
                        })
                )
            });

            return dyRt.fromArray(streamArr).mergeAll();
        }
    }
}
