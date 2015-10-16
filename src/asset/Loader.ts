/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class Loader{
        private _container:dyCb.Hash<string> = dyCb.Hash.create<string>();

        public load(url:string, id:string):dyRt.Stream;
        public load(url:Array<string>, id:string):dyRt.Stream;


        public load(args):dyRt.Stream{
            var url = arguments[0],
                id = arguments[1],
                self = this,
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

        public dispose(){
            this._container.removeAllChildren();
        }

        protected abstract loadAsset(url:string):dyRt.Stream;
        protected abstract loadAsset(url:Array<string>):dyRt.Stream;

        private _errorHandle(path:string, err:string);
        private _errorHandle(path:Array<string>, err:string);


        private _errorHandle(args) {
            var path = null,
                err = null;

            if(JudgeUtils.isArray(arguments[0])){
                path = arguments[0].join(",");
            }
            else{
                path = arguments[0];
            }
            err = arguments[1];

            Log.log(`加载${path} 资源失败:${err}`);
        }
    }
}

