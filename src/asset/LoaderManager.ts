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
        public load(assetArr:Array<AssetData>) :wdFrp.Stream;
        public load(assetArr:Array<AssetData>) :wdFrp.Stream;

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
                    return self._createLoadMultiAssetStream(asset.type || AssetType.UNKNOW, asset.url, asset.id);
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
            var loader = this._assetTable.getChild(id);

            return loader ? loader.get(id) : null;
        }

        private _createLoadMultiAssetStream(type:AssetType, url:string, id:string);
        private _createLoadMultiAssetStream(type:AssetType, url:Array<string>, id:string);

        private _createLoadMultiAssetStream(...args){
            var type = args[0],
                url = args[1],
                id = args[2],
                loader = this._getLoader(type, url),
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
            var loader = this._getLoader(AssetType.UNKNOW, url);

            return this._addToAssetTable(loader.load(url, id), id, loader);
        }

        private _getLoader(type:AssetType, url:string);
        private _getLoader(type:AssetType, url:Array<string>);

        private _getLoader(...args){
            var type = args[0],
                extname:string = null;

            if(JudgeUtils.isArray(args[1])){
                extname = wdCb.PathUtils.extname(args[1][0]);
            }
            else{
                extname = wdCb.PathUtils.extname(args[1]);
            }

            return LoaderFactory.create(type, extname.toLowerCase());
        }

        private _addToAssetTable(loadStream:wdFrp.Stream, id:string, loader:Loader):wdFrp.Stream{
            var self = this;

            return loadStream.do(null, null, () => {
                self._assetTable.addChild(id, loader);
            });
        }
    }

    export type AssetData = {
        type?:AssetType,
        url:Array<string>,
        id:string
    };
}
