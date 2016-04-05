module wd{
    declare var ArrayBuffer:any;

    export class GLTFLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _arrayBufferMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _imageMap:wdCb.Hash<HTMLImageElement> = wdCb.Hash.create<HTMLImageElement>();

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                self = this,
                jsonData:IGLTFJsonData = null;

            return AjaxLoader.load(url, "json")
                .flatMap((json:IGLTFJsonData) => {
                    jsonData = json;

                    return self._createLoadAllAssetsStream(url, json);
                })
                .takeLast()
                .map(() => {
                    return GLTFAssembler.create().build(GLTFParser.create().parse(jsonData, self._arrayBufferMap, self._imageMap));
                });
        }

        private _createLoadAllAssetsStream(url:string, json:IGLTFJsonData):wdFrp.Stream{
            return wdFrp.fromArray([
                    this._createLoadBuffersStream(url, json),
                    this._createLoadImageAssetStream(url, json)
                ])
                .mergeAll();
        }

        private _createLoadBuffersStream(filePath:string, json:IGLTFJsonData):wdFrp.Stream{
            var arrayBufferMap = this._arrayBufferMap;

            return this._createLoadAssetStream(filePath, json, json.buffers, arrayBufferMap, (id, url) => {
                    return AjaxLoader.load(url, "arraybuffer")
                        .do((buffer:any) => {
                            Log.error(!(buffer instanceof ArrayBuffer), Log.info.FUNC_SHOULD(`Buffer:${id}`, "be an array buffer"));
                            Log.error(buffer.byteLength !== buffer.byteLength, Log.info.FUNC_SHOULD(`Buffer:${id}'s length is ${buffer.byteLength}, but it`, `be ${buffer.byteLength}`));

                            arrayBufferMap.addChild(id, buffer);
                        });
                }
            );
        }

        private _createLoadImageAssetStream(filePath:string, json:IGLTFJsonData):wdFrp.Stream{
            var imageMap = this._imageMap;

            return this._createLoadAssetStream(filePath, json, json.images, imageMap, (id, url) => {
                    return ImageLoader.load(url)
                        .do((image:HTMLImageElement) => {
                            imageMap.addChild(id, image);
                        });
                }
            );
        }

        private _createLoadAssetStream(filePath:string, json:IGLTFJsonData, datas:any, dataMap:wdCb.Hash<any>, loadStreamFunc:(id:string, url:string) => wdFrp.Stream):wdFrp.Stream{
            var streamArr = [];

            if(datas){
                let id:string = null;

                for(id in datas){
                    if(datas.hasOwnProperty(id)){
                        let data = datas[id];

                        if(GLTFUtils.isBase64(data.uri)){
                            dataMap.addChild(id, GLTFUtils.decodeArrayBuffer(data.uri));
                        }
                        else{
                            let url = ModelLoaderUtils.getPath(filePath, data.uri);

                            streamArr.push(loadStreamFunc(id, url));
                        }
                    }
                }
            }

            return wdFrp.fromArray(streamArr).mergeAll();
        }
    }
}
