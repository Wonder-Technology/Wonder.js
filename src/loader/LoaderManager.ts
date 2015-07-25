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

        private _resCount:number = 0;
        private _currentLoadedCount:number = 0;

        //hook
        public onload:Function;
        public onloading:Function;

        public getResourceCount() {
            return this._resCount;
        }

        public getCurrentLoadedCount() {
            return this._currentLoadedCount;
        }

        public load(resourcesArr:Array<{url:string; id:string}>) {
            var self = this;

            return dyRt.fromArray(resourcesArr).flatMap(function(res){
                self._resCount++;

                return GLSLLoader.getInstance().load(res.url, res.id);
            });
        }

        public reset() {
            this._resCount = 0;
            this._currentLoadedCount = 0;
        }

        public onResLoaded() {
            this._currentLoadedCount += 1;
        }

        public onResError(path, err) {
            dyCb.Log.log("加载" + path + "资源失败");
            if(err){
                dyCb.Log.log(err);
            }
        }

        private _isFinishLoad() {
            var self = this;

            if (this.getCurrentLoadedCount() === this.getResourceCount()) {
                if (this.onload) {
                    this.onload();
                }
                else {
                    dyCb.Log.assert(false, "没有定义onload");
                }
            }
            else {
                if (this.onloading) {
                    setTimeout(function () {
                        self.onloading(self.getCurrentLoadedCount(), self.getResourceCount())
                    }, 16);
                }
                setTimeout(function () {
                    self._isFinishLoad.call(self);
                }, 16);
            }
        }
    }
}
