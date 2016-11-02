// module wd {
//     @singleton()
//     export class WDLoader extends Loader {
//         public static getInstance():any {}
//
// 		private constructor(){super();}
//
//         private _parseData:WDFileParseData = null;
//
//         protected loadAsset(url:string, id:string):wdFrp.Stream;
//         protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;
//
//         @require(function (...args) {
//             assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
//         })
//         protected loadAsset(...args):wdFrp.Stream {
//             var url = args[0],
//                 self = this;
//
//             return AjaxLoader.load(url, "json")
//                 // .flatMap((json:WDFileJsonData) => {
//                 .map((json:IWDJsonData) => {
//                     self._parseData = WDParser.create().parse(json);
//
//                     // return self._createLoadMapStream(url, self._parseData);
//
//                     return WDBuilder.create().build(self._parseData);
//                 });
//                 // .lastOrDefault()
//                 // .map(() => {
//                 //     return WDBuilder.create().build(self._parseData);
//                 // });
//         }
//
//         // private _createLoadMapStream(filePath:string, parseData):wdFrp.Stream{
//         //     var streamArr = [];
//         //
//         //     parseData.materials.forEach((material:WDFileParseMaterialData) => {
//         //         var mapUrlArr = [];
//         //
//         //         if (material.diffuseMapUrl) {
//         //             mapUrlArr.push(["diffuseMap", material.diffuseMapUrl, material]);
//         //         }
//         //         if (material.specularMapUrl) {
//         //             mapUrlArr.push(["specularMap", material.specularMapUrl, material]);
//         //         }
//         //         if (material.normalMapUrl) {
//         //             mapUrlArr.push(["normalMap", material.normalMapUrl, material]);
//         //         }
//         //
//         //         streamArr = streamArr.concat(mapUrlArr);
//         //     });
//         //
//         //     return wdFrp.fromArray(streamArr)
//         //         .flatMap(([type, mapUrl, material]) => {
//         //             return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
//         //                 .do((asset:TextureAsset) => {
//         //                     material[type] = asset.toTexture();
//         //                 });
//         //         });
//         // }
//     }
// }






module wd{
    declare var ArrayBuffer:any;

    @singleton()
    export class WDLoader extends Loader{
        public static getInstance():any {}

        private constructor(){super();}

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
                jsonData:IWDJsonData = null;

            return AjaxLoader.load(url, "json")
                .flatMap((json:IWDJsonData) => {
                    jsonData = json;

                    //todo fix
                    // return self._createLoadAllAssetsStream(url, json);
                    // return wdFrp.empty;
                    return wdFrp.fromArray([1]);
                })
                .lastOrDefault()
                .map(() => {
                    return WDAssembler.create().build(WDParser.create().parse(jsonData, self._arrayBufferMap, self._imageMap));
                });
        }

        // private _createLoadAllAssetsStream(url:string, json:IWDJsonData):wdFrp.Stream{
        //     return wdFrp.fromArray([
        //         this._createLoadBuffersStream(url, json),
        //         this._createLoadImageAssetStream(url, json)
        //     ])
        //         .mergeAll();
        // }

        // private _createLoadBuffersStream(filePath:string, json:IWDJsonData):wdFrp.Stream{
        //     var arrayBufferMap = this._arrayBufferMap;
        //
        //     return this._createLoadAssetStream(filePath, json, json.buffers, arrayBufferMap, (id, url) => {
        //             return AjaxLoader.load(url, "arraybuffer")
        //                 .do((buffer:any) => {
        //                     Log.error(!(buffer instanceof ArrayBuffer), Log.info.FUNC_SHOULD(`Buffer:${id}`, "be an array buffer"));
        //                     Log.error(buffer.byteLength !== buffer.byteLength, Log.info.FUNC_SHOULD(`Buffer:${id}'s length is ${buffer.byteLength}, but it`, `be ${buffer.byteLength}`));
        //
        //                     arrayBufferMap.addChild(id, buffer);
        //                 });
        //         }
        //     );
        // }
        //
        // private _createLoadImageAssetStream(filePath:string, json:IWDJsonData):wdFrp.Stream{
        //     var imageMap = this._imageMap;
        //
        //     return this._createLoadAssetStream(filePath, json, json.images, imageMap, (id, url) => {
        //             return ImageLoader.load(url)
        //                 .do((image:HTMLImageElement) => {
        //                     imageMap.addChild(id, image);
        //                 });
        //         }
        //     );
        // }
        //
        // private _createLoadAssetStream(filePath:string, json:IWDJsonData, datas:any, dataMap:wdCb.Hash<any>, loadStreamFunc:(id:string, url:string) => wdFrp.Stream):wdFrp.Stream{
        //     var streamArr = [];
        //
        //     if(datas){
        //         let id:string = null;
        //
        //         for(id in datas){
        //             if(datas.hasOwnProperty(id)){
        //                 let data = datas[id];
        //
        //                 if(WDUtils.isBase64(data.uri)){
        //                     dataMap.addChild(id, WDUtils.decodeArrayBuffer(data.uri));
        //                 }
        //                 else{
        //                     let url = ModelLoaderUtils.getPath(filePath, data.uri);
        //
        //                     streamArr.push(loadStreamFunc(id, url));
        //                 }
        //             }
        //         }
        //     }
        //
        //     return wdFrp.fromArray(streamArr).mergeAll();
        // }
    }
}
