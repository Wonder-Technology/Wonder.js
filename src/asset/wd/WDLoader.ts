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
                //.flatMap((json:WDFileJsonData) => {
                //    self._parseData = WDParser.create().parse(json);
                //
                //    return this._createLoadMapStream(url, self._parseData);
                //})
                //.map((data) => {
                //    return WDBuilder.create().build(self._parseData);
                //});

                //.map((json:WDFileJsonData) => {
                //    self._parseData = WDParser.create().parse(json);
                //
                //
                //    return WDBuilder.create().build(self._parseData);
                //
                //    //return this._createLoadMapStream(url, self._parseData);
                //})

                .map((json:WDFileJsonData) => {
                    self._parseData = WDParser.create().parse(json);

                    return this._createLoadMapStream(url, self._parseData)
                    .concat(
                        wdFrp.callFunc((parseData) => {
                            //wdFrp.defer(() => {
                            //return wdFrp.just(WDBuilder.create().build(self._parseData));
                            self.data = WDBuilder.create().build(self._parseData);
                            //})
                        })
                    )
                })
//                    wdFrp.just(WDBuilder.create().build(self._parseData))
//                    .merge(
//this._createLoadMapStream(url, self._parseData)
//    .ignoreElements()
//                        //.map((data:any) => {
//                        //    return null;
//                        //})
//                    )
//                })
                //.merge([
                //    //wdFrp.just(WDBuilder.create().build(self._parseData)),
                //    this._createLoadMapStream(url, self._parseData)
                //    //.ignoreElements()
                //]);





            //    .concat(
            ////wdFrp.fromArray([1,2])
            ////    .do((asset:TextureAsset) => {
            ////        var t = 1;
            ////    }, null, null)
            ////.mergeAll(),
            //
            //        //    this._createLoadMapStream(url),
            //
            //        //wdFrp.defer(() => {
            //        //    this._createLoadMapStream(url),
            //        //}),
            ////wdFrp.callFunc(()=> {
            ////    return this._createLoadMapStream(url);
            ////}),
            //        //wdFrp.callFunc(()=> {
            //        //    var t = 1;
            //        //}),
            //        wdFrp.callFunc(()=> {
            //            self.data = WDBuilder.create().build(self._parseData);
            //        })
            //    );
                //.concat(this._createLoadMapStream(url),
                //    //.concat(
                //        wdFrp.callFunc(()=> {
                //            return WDBuilder.create().build(self._parseData);
                //        })
                //    //)
                //)
                //.concat((json:WDFileJsonData) => {
                //    //self._parseData = WDParser.create().parse(json);
                //
                //    return this._createLoadMapStream(url, json)
                //    //return wdFrp.callFunc(()=> {
                //    //    return 1;
                //    //    })
                //    .concat(
                //        wdFrp.callFunc(()=> {
                //            //var a = data;
                //            return WDBuilder.create().build(self._parseData);
                //        })
                //    )
                //
                //})
            //
            //
            //.concat(
            //    wdFrp.callFunc(()=> {
            //        return 1;
            //    }),
            //
            //    wdFrp.callFunc((data)=> {
            //        var a = data;
            //        return WDBuilder.create().build(self._parseData);
            //    })
            //)
                //.concat(
                //    wdFrp.callFunc((data)=> {
                //        var a = data;
                //        return WDBuilder.create().build(self._parseData);
                //    })
                //)
        }

        private _createLoadMapStream(filePath:string, parseData):wdFrp.Stream{
            var streamArr = [],
                //parseData = this._parseData,
                //parseData = WDParser.create().parse(json),
                i = null;

            //this._parseData = parseData;

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

                //streamArr.push(
                //    wdFrp.fromArray(mapUrlArr)
                //        //.flatMap(([type, mapUrl]) => {
                //        //    return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
                //        //        .do((asset:TextureAsset) => {
                //        //            material[type] = asset.toTexture();
                //        //        }, null, null);
                //        //})
                //)
            })

            //return wdFrp.fromArray(streamArr).mergeAll();
            return wdFrp.fromArray(streamArr)
        //.do((asset:TextureAsset) => {
        //    var a = 1;
        //    }, null, null);
                    .map(([type, mapUrl, material]) => {
                        //.flatMap((arr) => {
                        //    var mapUrl = arr[1],
                        //        type = arr[0],
                        //        material = arr[2];
                        //
                        return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
                        //return ImageLoader.load(ModelLoaderUtils.getPath(filePath, mapUrl))


                        // return wdFrp.fromPromise(new RSVP.Promise(function (resolve, reject) {
                        //    resolve(42);
                        //}))

                            .do((asset:TextureAsset) => {
                                //.map((asset:TextureAsset) => {
                                material[type] = asset.toTexture();
                                //var a = 1;
                                //material
                                //return parseData;
                            })
                            //.concat(
                            //    wdFrp.callFunc((data)=> {
                            //        //material[type] = asset.toTexture();
                            //        //material
                            //        var a = 1;
                            //    })
                            //)
                            //
                            //return wdFrp.callFunc(()=> {
                            //    var a= 1;
                            //})
                            //.do(() => {
                            //    var b = 1;
                            //})
                    })
            .mergeAll();






            //return wdFrp.fromArray(mapUrlArr)
            //    .flatMap(([type, mapUrl]) => {
            //        return TextureLoader.getInstance().load(ModelLoaderUtils.getPath(filePath, mapUrl))
            //            .do((asset:TextureAsset) => {
            //                material[type] = asset.toTexture();
            //            }, null, null);
            //    })
        }
    }
}
