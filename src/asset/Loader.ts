module wd{
    export abstract class Loader{
        protected data:any = null;

        private _container:wdCb.Hash<string> = wdCb.Hash.create<string>();

        public load(url:string):wdFrp.Stream;
        public load(url:Array<string>):wdFrp.Stream;
        public load(url:string, id:string):wdFrp.Stream;
        public load(url:Array<string>, id:string):wdFrp.Stream;


        public load(...args):wdFrp.Stream{
            var url = args[0],
                id = null,
                self = this,
                data = null,
                stream = null;

            if(args.length === 1){
                if(JudgeUtils.isArrayExactly(url)){
                    id = url.join("-");
                }
                else{
                    id = url;
                }
            }
            else{
                id = args[1];
            }

            data = this._container.getChild(id);

            if(data){
                stream = wdFrp.just(data);
            }
            else{
                stream = this.loadAsset(url, id)
                    .do(
                    //    (data) => {
                    //    //var a = 1;
                    //    if(data === null){
                    //        return;
                    //    }
                    //    //
                        //    //self._container.addChild(id, data);
                        //}
                        null
                        , (err) => {
                            self._errorHandle(url, err);
                        }, () => {
                            if(self.data){
                                self._container.addChild(id, self.data);
                            }
                        })
                //.concat(
                    //    wdFrp.callFunc((data)=> {
                    //        self._container.addChild(id, self.data);
                    //    })
                    //)
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

        protected abstract loadAsset(url:string, id:string):wdFrp.Stream;
        protected abstract loadAsset(url:Array<string>, id:string):wdFrp.Stream;

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

