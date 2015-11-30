/// <reference path="../filePath.d.ts"/>
module wd{
    export class LoaderManager{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public assetCount:number = 0;
        public currentLoadedCount:number = 0;

        private _assetTable:wdCb.Hash<any> = wdCb.Hash.create();

        public load(url:string):wdFrp.Stream;
        public load(assetArr:Array<{url:string; id:string}>) :wdFrp.Stream;
        public load(assetArr:Array<{url:Array<string>; id:string}>) :wdFrp.Stream;

        public load(...args) {
            var self = this;

            if(JudgeUtils.isString(args[0])){
                let url:string = args[0],
                    id:string = url;

                return this._createLoadSingleAssetStream(url, id);
            }
            else{
                let assetArr = args[0];

                return wdFrp.fromArray(assetArr).flatMap((asset) => {
                    return self._createLoadMultiAssetStream(asset.url, asset.id);
                });
            }
        }

        public reset() {
            this.assetCount = 0;
            this.currentLoadedCount = 0;
        }

        public dispose(){
            this.reset();

            LoaderFactory.createAllLoader().forEach((loader:Loader) => {
                loader.dispose();
            });
        }

        public get(id:string):any{
            return this._assetTable.getChild(id).get(id);
        }

        private _createLoadMultiAssetStream(url:string, id:string);
        private _createLoadMultiAssetStream(url:Array<string>, id:string);

        private _createLoadMultiAssetStream(...args){
            var url = args[0],
                id = args[1],
                loader = this._getLoader(url),
                stream = null,
                self = this;

            if(!loader.has(id)){
                self.assetCount ++;
            }

            return this._addToAssetTable(loader.load(url, id)
                .map((data) => {
                    self.currentLoadedCount++;

                    return {
                        currentLoadedCount: self.currentLoadedCount,
                        assetCount:self.assetCount
                    }
                }), id, loader);
        }

        private _createLoadSingleAssetStream(url, id){
            var loader = this._getLoader(url);

            return this._addToAssetTable(loader.load(url, id), id, loader);
        }

        private _getLoader(url:string);
        private _getLoader(url:Array<string>);

        private _getLoader(...args){
            var extname:string = null;

            if(JudgeUtils.isArray(args[0])){
                extname = wdCb.PathUtils.extname(args[0][0]);
            }
            else{
                extname = wdCb.PathUtils.extname(args[0]);
            }

            return LoaderFactory.create(extname.toLowerCase());
        }

        private _addToAssetTable(loadStream:wdFrp.Stream, id:string, loader:Loader):wdFrp.Stream{
            var self = this;

            return loadStream.do(null, null, () => {
                self._assetTable.addChild(id, loader);
            });
        }
    }
}
