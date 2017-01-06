module wd{
    export abstract class Loader{
        private _container:wdCb.Hash<string> = wdCb.Hash.create<string>();

        public load(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        public load(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;


        public load(...args):wdFrp.Stream{
            var url = args[0],
                id = null,
                config:AssetConfigData = null,
                self = this,
                data = null,
                stream = null;

            id = args[1];
            config = args[2];

            data = this._container.getChild(id);

            if(data){
                stream = wdFrp.just(data);
            }
            else{
                stream = this.loadAsset(url, id, config)
                    .do((data:any) => {
                            self._container.addChild(id, data);
                            LoaderManager.getInstance().add(id, self);
                        },(err:any) => {
                            self._errorHandle(url, err);
                        }, null);
            }

            return stream;
        }

        public get(id:string):any{
            return this._container.getChild(id);
        }

        public has(id:string){
            return this._container.hasChild(id);
        }

        public dispose(){
            this._container.removeAllChildren();
        }

        protected abstract loadAsset(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        protected abstract loadAsset(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;

        private _errorHandle(path:string, err:string);
        private _errorHandle(path:Array<string>, err:string);


        private _errorHandle(...args) {
            var path = null,
                err = null;

            if(JudgeUtils.isArrayExactly(args[0])){
                path = args[0].join(",");
            }
            else{
                path = args[0];
            }
            err = args[1];

            Log.log(`load ${path} asset fail:${err}`);
        }
    }
}

