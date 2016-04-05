module wd {
    export class WDLoader extends Loader {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _parseData:WDFileParseData = null;

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                self = this;

            return AjaxLoader.load(url, "json")
                .flatMap((json:WDFileJsonData) => {
                    self._parseData = WDParser.create().parse(json);

                    return self._createLoadMapStream(url, self._parseData);
                })
                .lastOrDefault()
                .map(() => {
                    return WDBuilder.create().build(self._parseData);
                });
        }

        private _createLoadMapStream(filePath:string, parseData):wdFrp.Stream{
            var streamArr = [];

            parseData.materials.forEach((material:WDFileParseMaterialData) => {
                var mapUrlArr = [];

                if (material.diffuseMapUrl) {
                    mapUrlArr.push(["diffuseMap", material.diffuseMapUrl, material]);
                }
                if (material.specularMapUrl) {
                    mapUrlArr.push(["specularMap", material.specularMapUrl, material]);
                }
                if (material.normalMapUrl) {
                    mapUrlArr.push(["normalMap", material.normalMapUrl, material]);
                }

                streamArr = streamArr.concat(mapUrlArr);
            });

            return wdFrp.fromArray(streamArr)
                .flatMap(([type, mapUrl, material]) => {
                    return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
                        .do((asset:TextureAsset) => {
                            material[type] = asset.toTexture();
                        });
                });
        }
    }
}
