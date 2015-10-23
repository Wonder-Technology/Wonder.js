/// <reference path="../../definitions.d.ts"/>
module dy{
    //todo support multi materials
    export class OBJLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        //todo all Loader use the contract
        @In(function(...args){
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("js's url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var url = args[0];

            return OBJFileLoader.create().load(url);
        }
    }

    class OBJFileLoader{
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
                    self._read(data);
                }, null, null)
                .concat(
                    [
                        //dyRt.callFunc((data:any) => {
                        //    return self._read(data);
                        //}),
                        dyRt.defer(() => {
                            return self._mtlFileLoader.load(self._getMtlFilePath(url));
                        }),
                        dyRt.callFunc(()=>{
                            return self._createModel();
                        })
                    ]
                )
            //.map((data:string) => {
            //    self._mtlFileLoader = MTLLoader.create();
            //    return self._mtlFileLoader.load(self._getMtlFilePath(url)).map(()=>{self._createModel();});
            //}).mergeAll();
            //.concat(
            //    dyRt.defer(() => {
            //            return dyRt.judge(
            //                () => { return this._getMtlFilePath(url) !== null},
            //                () => {
            //                    self._mtlFileLoader = MTLLoader.create();
            //
            //                    //return self._mtlFileLoader.load(self._getMtlFilePath(url)).concat(self._mtlFileLoader.createMapStream())
            //                    return self._mtlFileLoader.load(self._getMtlFilePath(url));
            //                },
            //                () => {
            //                    return dyRt.empty();
            //                }
            //            )
            //        }
            //        )
            //        .map((data:any)=> {
            //            return self._createModel();
            //        })
            //)
        }

        private _getMtlFilePath(objFilePath:string){
            if(this._objParser.mtlFilePath === null){
                return null;
            }

            return `${dyCb.PathUtils.dirname(objFilePath)}/${this._objParser.mtlFilePath}`;
        }

        //todo remove
        private _read(data:string){
            //parse
            this._objParser.parse(data);
        }

        private _createModel():GameObject{
            var result = GameObject.create(),
                materials = this._mtlFileLoader.materials;

            //todo clear obj and mtl data


            this._objParser.objects.forEach((object:ObjectModel) => {
                var geometry = ModelGeometry.create(),
                    material:LightMaterial = null,
                    materialModel:MaterialModel = null,
                    model = null;

                geometry.vertices = object.vertices;
                geometry.indices = object.indices;
                geometry.normals = object.normals;
                geometry.texCoords = object.texCoords;

                materialModel = materials.findOne((material:MaterialModel) => {
                    return material.name === object.materialName;
                });

                dyCb.Log.error(!materialModel, `can't find material:${object.materialName} in mtl`);

                material = LightMaterial.create();
                if(materialModel.diffuseColor){
                    material.color = materialModel.diffuseColor;
                }
                if(materialModel.specularColor){
                    material.specular = materialModel.specularColor;
                }

                if(materialModel.diffuseMap){
                    material.diffuseMap = materialModel.diffuseMap;
                }
                if(materialModel.specularMap){
                    material.specularMap = materialModel.specularMap;
                }
                if(materialModel.bumpMap){
                    material.normalMap = materialModel.bumpMap;
                }

                if(materialModel.shininess !== null){
                    material.shininess = materialModel.shininess;
                }

                if(materialModel.alpha !== null){
                    material.alpha = materialModel.alpha;
                }


                geometry.material = material;

                model = GameObject.create();
                model.addComponent(MeshRenderer.create());
                model.addComponent(geometry);

                result.addChild(model);
            });

            //this._clearData();


            return result;
        }
    }

    class MTLLoader{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get materials(){
            return this._mtlParser.materials;
        }

        private _mtlParser:MTLParser = MTLParser.create();

        public load(url:string):dyRt.Stream{
            var self = this;

            return AjaxLoader.load(url, "text")
            .do((data:string) => {

                self._read(data);
            })
                //.map((data:string) => {
                //    self._read(data);
                //
                //    return self.createMapStream(url);
                //}).mergeAll();
                .concat(
                    [
                        //dyRt.callFunc((data:any) => {
                        //    return self._read(data);
                        //}),
                        dyRt.defer(() => {
                            return self.createMapStream(url)
                        })
                    ]
                )
            //    .do((data:string) => {
            //        self._read(data);
            //    })
            //.concat(
            //dyRt.defer(() => {
            //        //return dyRt.judge(
            //        //    () => { return this._mtlParser.materials.getCount() > 0},
            //        //    () => {
            //        //        return self.createMapStream(url);
            //        //    },
            //        //    () => {
            //        //        return dyRt.empty();
            //        //    }
            //        //)
            //        return self.createMapStream(url);
            //    }
            //    )
        //)

        }

        public createMapStream(mtlFilePath:string){
            var streamArr = [],
                self = this;

            this.materials.map((material:MaterialModel) => {
                var mapUrlArr = [];

                if(material.diffuseMapUrl){
                    mapUrlArr.push(["diffuseMap", material.diffuseMapUrl]);
                }
                if(material.specularMapUrl){
                    mapUrlArr.push(["specularMap", material.specularMapUrl]);
                }
                if(material.bumpMapUrl){
                    mapUrlArr.push(["bumpMap", material.bumpMapUrl]);
                }

                streamArr.push(
                    dyRt.fromArray(mapUrlArr)
                        .flatMap(([type, mapUrl]) => {
                            return TextureLoader.getInstance().load(self._getPath(mtlFilePath, mapUrl))
                                .do((asset:TextureAsset) => {
                                    material[type] = asset.toTexture();
                                }, null, null);
                                //.concat(
                                //    dyRt.callFunc((asset:TextureAsset) => {
                                //        material[type] = asset.toTexture();
                                //    })
                                //)
                        })
                )
            });

            return dyRt.fromArray(streamArr).mergeAll();
        }

        //todo move to utils
        private _getPath(mtlFilePath:string, mapUrl:string){
            return `${dyCb.PathUtils.dirname(mtlFilePath)}/${mapUrl}`;
        }

        //todo remove
        private _read(data:string){
            this._mtlParser.parse(data);
        }
    }
}
