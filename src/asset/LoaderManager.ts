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


        public load(resourcesArr:Array<{url:string; id:string}>) {
            var self = this;

            return dyRt.fromArray(resourcesArr).flatMap((res) => {
                var loader = GLSLLoader.getInstance(),
                    stream = null;

                if(!loader.has(res.id)){
                    self.resCount ++;
                }

                stream = loader.load(res.url, res.id)
                    .map((data) => {
                        self.currentLoadedCount++;

                        return {
                            currentLoadedCount: self.currentLoadedCount,
                            resCount:self.resCount
                        }
                    });

                return stream;
            });
        }

        public reset() {
            this.resCount = 0;
            this.currentLoadedCount = 0;
        }
    }
}
