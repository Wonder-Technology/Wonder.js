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

        //private _mtlFileLoader:MTLLoader = MTLLoader.create();
        private _mtlFileLoader:MTLLoader = null;
        //private _objParser:OBJParser = OBJParser.create();
        private _objParser:OBJParser = null;


        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        //todo all Loader use the contract
        @In(function(...args){
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("js's url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var self = this,
                url = args[0];

            return AjaxLoader.load(url, "text")
                .do((data:any) => {
                    self._read(data);
                }, null, null)
                .concat(
                    dyRt.judge(
                        () => { return self._objParser.mtlFilePath !== null},
                        () => {
                            self._mtlFileLoader = MTLLoader.create();

                            return self._mtlFileLoader.load(self._objParser.mtlFilePath).concat(self._mtlFileLoader.createMapStream())
                        },
                        () => {
                            return dyRt.empty();
                        }
                    )
                )
                .map((data:any)=> {
                    return self._createModel();
                });
        }

        //todo remove
        private _read(data:string){
            this._objParser = OBJParser.create();

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

                geometry.material = material;

                model = GameObject.create();
                model.addComponent(MeshRenderer.create());
                model.addComponent(geometry);

                result.addChild(model);
            });

            //this._clearData();


            return result;
        }

        //private _clearData(){
        //
        //}
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
                }, null, null);
        }

        public createMapStream(){
            this._mtlParser.materials.map((material:MaterialModel) => {
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

                return dyRt.fromArray(mapUrlArr)
                    .flatMap(([type, url]) => {
                        return TextureLoader.getInstance().load(url)
                            .do((url:string) => {
                                material[type] = TextureLoader.getInstance().get(url);
                            }, null, null);
                    });
            });
        }

        //public clearData(){
        //}

        //todo remove
        private _read(data:string){
            this._mtlParser.parse(data);
        }
    }
}
