module wd{
    export class GLTFLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _gltfAssembler:GLTFAssembler = GLTFAssembler.create();
        private _gltfParser:GLTFParser = GLTFParser.create();
        private _parseData:IGLTFParseData = null;

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                self = this,
                jsonData:IGLTFJsonData = null;

            return AjaxLoader.load(url, "json")
                //.concat([
                //    this._gltfParser.createLoadAllAssetsStream(url, json),
                //])
                .flatMap((json:IGLTFJsonData) => {
                    return self._gltfParser.createLoadAllAssetsStream(url, json).concat(
                        wdFrp.callFunc(()=> {
                            return self._gltfAssembler.build(self._gltfParser.parse(json));
                        })
                    );
                });
        }
    }
}
