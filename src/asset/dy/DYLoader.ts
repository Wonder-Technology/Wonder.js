/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DYLoader extends Loader {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _dyParser:DYParser = DYParser.create();
        private _dyBuilder:DYBuilder = DYBuilder.create();
        private _parseData:DYFileParseData = null;


        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        @In(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var url = args[0],
                self = this;

            return AjaxLoader.load(url, "json")
                .flatMap((json:DYFileJsonData) => {
                    self._parseData = self._dyParser.parse(json);

                    return this._createLoadMapStream(url);
                })
            .concat(
                //[
                //this._createLoadMapStream(),
                dyRt.callFunc(()=> {
                    return self._dyBuilder.build(self._parseData);
                })
                    //]
            );
        }

        private _createLoadMapStream(filePath:string):dyRt.Stream{
            var streamArr = [],
                parseData = this._parseData,
                i = null;

            parseData.materials.forEach((material:DYFileParseMaterialData) => {
                var mapUrlArr = [];

                if (material.diffuseMapUrl) {
                    mapUrlArr.push(["diffuseMap", material.diffuseMapUrl]);
                }
                if (material.specularMapUrl) {
                    mapUrlArr.push(["specularMap", material.specularMapUrl]);
                }
                if (material.normalMapUrl) {
                    mapUrlArr.push(["normalMap", material.normalMapUrl]);
                }

                streamArr.push(
                    dyRt.fromArray(mapUrlArr)
                        .flatMap(([type, mapUrl]) => {
                            return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
                                .do((asset:TextureAsset) => {
                                    material[type] = asset.toTexture();
                                }, null, null);
                        })
                )
            })

            return dyRt.fromArray(streamArr).mergeAll();
        }
    }
}
