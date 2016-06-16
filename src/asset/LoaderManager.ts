module wd{
    @singleton()
    export class LoaderManager{
        public static getInstance():any {}

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

                return wdFrp.fromArray(assetArr).concatMap((asset) => {
                    return self._createLoadMultiAssetStream(asset.type || EAssetType.UNKNOW, asset.url, asset.id);
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

        public add(id:string, loader:Loader){
            this._assetTable.addChild(id, loader);
        }

        private _createLoadMultiAssetStream(type:EAssetType, url:string, id:string);
        private _createLoadMultiAssetStream(type:EAssetType, url:Array<string>, id:string);

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

            return loader.load(url, id)
                .map(() => {
                    self.currentLoadedCount++;

                    return {
                        currentLoadedCount: self.currentLoadedCount,
                        assetCount:self.assetCount
                    }
                });
        }

        private _createLoadSingleAssetStream(url, id){
            var loader = this._getLoader(EAssetType.UNKNOW, url);

            return loader.load(url, id);
        }

        private _getLoader(type:EAssetType, url:string);
        private _getLoader(type:EAssetType, url:Array<string>);

        private _getLoader(...args){
            var type = args[0],
                extname:string = null;

            if(JudgeUtils.isArrayExactly(args[1])){
                extname = wdCb.PathUtils.extname(args[1][0]);
            }
            else{
                extname = wdCb.PathUtils.extname(args[1]);
            }

            return LoaderFactory.create(type, extname.toLowerCase());
        }
    }

    export type AssetData = {
        type?:EAssetType,
        url:Array<string>,
        id:string
    };
}
