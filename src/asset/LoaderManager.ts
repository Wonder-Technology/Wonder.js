/// <reference path="../filePath.d.ts"/>
module dy{
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

        private _assetTable:dyCb.Hash<any> = dyCb.Hash.create();

        public load(url:string):dyRt.Stream;
        public load(assetArr:Array<{url:string; id:string}>) :dyRt.Stream;
        public load(assetArr:Array<{url:Array<string>; id:string}>) :dyRt.Stream;

        public load() {
            var self = this;

            if(JudgeUtils.isString(arguments[0])){
                let url:string = arguments[0],
                    id:string = url;

                return this._createLoadSingleAssetStream(url, id);
            }
            else{
                let assetArr = arguments[0];

                return dyRt.fromArray(assetArr).flatMap((asset) => {
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

        private _createLoadMultiAssetStream(args){
            var url = arguments[0],
                id = arguments[1],
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

        private _getLoader(arg){
            var extname:string = null;

            if(JudgeUtils.isArray(arguments[0])){
                extname = dyCb.PathUtils.extname(arguments[0][0]);
            }
            else{
                extname = dyCb.PathUtils.extname(arguments[0]);
            }

            return LoaderFactory.create(extname.toLowerCase());
        }

        private _addToAssetTable(loadStream:dyRt.Stream, id:string, loader:Loader):dyRt.Stream{
            var self = this;

            return loadStream.do(null, null, () => {
                self._assetTable.addChild(id, loader);
            });
        }
    }
}
