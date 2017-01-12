module wd{
    declare var ArrayBuffer:any;

    @singleton()
    export class WDLoader extends Loader{
        public static getInstance():any {}

        private constructor(){super();}

        private _arrayBufferMap:wdCb.Hash<ArrayBuffer> = wdCb.Hash.create<ArrayBuffer>();
        private _imageMap:wdCb.Hash<HTMLImageElement> = wdCb.Hash.create<HTMLImageElement>();

        protected loadAsset(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                config:AssetConfigData = args[2],
                self = this,
                jsonData:IWDJsonDataParser = null;

            return AjaxLoader.load(url, "json")
                .flatMap((json:IWDJsonDataParser) => {
                    jsonData = json;

                    return self._createLoadAllAssetsStream(url, config, json);
                })
                .lastOrDefault()
                .map(() => {
                    return WDAssembler.create().build(WDParser.create().parse(jsonData, self._arrayBufferMap, self._imageMap));
                });
        }

        private _createLoadAllAssetsStream(url:string, config:AssetConfigData, json:IWDJsonDataParser):wdFrp.Stream{
            return wdFrp.fromArray([
                this._createLoadBuffersStream(url, json),
                this._createLoadImageAssetStream(url, config, json)
            ])
                .mergeAll();
        }

        private _createLoadBuffersStream(filePath:string, json:IWDJsonDataParser):wdFrp.Stream{
            var arrayBufferMap = this._arrayBufferMap;

            return this._createLoadAssetStream(filePath, json, json.buffers, (id, uri) =>{
                    arrayBufferMap.addChild(id, WDUtils.decodeArrayBuffer(uri));
                }, (id, url) => {
                    return AjaxLoader.load(url, "arraybuffer")
                        .do((buffer:any) => {
                            Log.error(!(buffer instanceof ArrayBuffer), Log.info.FUNC_SHOULD(`Buffer:${id}`, "be an array buffer"));
                            Log.error(buffer.byteLength !== buffer.byteLength, Log.info.FUNC_SHOULD(`Buffer:${id}'s length is ${buffer.byteLength}, but it`, `be ${buffer.byteLength}`));

                            arrayBufferMap.addChild(id, buffer);
                        });
                }
            );
        }

        private _createLoadImageAssetStream(filePath:string, config:AssetConfigData, json:IWDJsonDataParser):wdFrp.Stream {
            var imageMap = this._imageMap;

            return this._createLoadAssetStream(filePath, json, json.images, (id, uri) =>{
                    imageMap.addChild(id, Base64Utils.createImageFromBase64(uri));
                }, (id, url) => {
                    //todo test compress texture!
                    return TextureLoader.getInstance().load(url, id, config)
                        .do((asset:TextureAsset) => {
                            imageMap.addChild(id, asset.source);
                        });
                }
            );
        }

        private _createLoadAssetStream(filePath:string, json:IWDJsonDataParser, datas:any, addBase64AssetFunc:(id:string, url:string) => void, loadStreamFunc:(id:string, url:string) => wdFrp.Stream):wdFrp.Stream{
            var streamArr = [];

            if(datas){
                let id:string = null;

                for(id in datas){
                    if(datas.hasOwnProperty(id)){
                        let data = datas[id];

                        if(WDUtils.isBase64(data.uri)){
                            addBase64AssetFunc(id, data.uri);
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

