/// <reference path="../definitions.d.ts"/>
module dy{
    export class Loader{
        private _container:dyCb.Hash<string> = dyCb.Hash.create<string>();

        public load(url:string, id:string):dyRt.Stream{
            var self = this,
                stream = null;

            if(this._container.getChild(id)){
                stream = dyRt.empty();
            }
            else{
                stream = this.loadAsset(url)
                    .do((data) => {
                        self._container.addChild(id, data);
                    }, (err) => {
                        self._errorHandle(url, err);
                    }, null);
            }

            return stream;
        }

        public get(id:string):string{
            return this._container.getChild(id);
        }

        public has(id:string){
            return this._container.hasChild(id);
        }

        protected loadAsset(url:string):dyRt.Stream{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _errorHandle(path:string, err:string) {
            dyCb.Log.log("加载" + path + "资源失败:" + err);
        }
    }
}

