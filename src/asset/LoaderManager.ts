/// <reference path="../definitions.d.ts"/>
module dy{
    export class LoaderManager{
        private static _instance:LoaderManager = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public resCount:number = 0;
        public currentLoadedCount:number = 0;

        public load(url:string):dyRt.Stream;
        public load(resourcesArr:Array<{url:string; id:string}>) :dyRt.Stream;

        public load() {
            var self = this;

            if(JudgeUtils.isString(arguments[0])){
                let url:string = arguments[0],
                    id:string = url;

                return this._createLoadStream(url, id);
            }
            else{
                let resourcesArr = arguments[0];

                return dyRt.fromArray(resourcesArr).flatMap((res) => {
                    return self._createLoadResourceStream(res.url, res.id);
                });
            }
        }

        public reset() {
            this.resCount = 0;
            this.currentLoadedCount = 0;
        }

        private _createLoadResourceStream(url, id){
            var loader = this._getLoader(url),
                stream = null,
                self = this;

            if(!loader.has(id)){
                self.resCount ++;
            }

            stream = loader.load(url, id)
                .map((data) => {
                    self.currentLoadedCount++;

                    return {
                        currentLoadedCount: self.currentLoadedCount,
                        resCount:self.resCount
                    }
                });

            return stream;
        }

        private _createLoadStream(url, id){
            return this._getLoader(url).load(url, id);
        }

        private _getLoader(url){
            return LoaderFactory.create(dyCb.PathUtils.extname(url));
        }
    }
}
