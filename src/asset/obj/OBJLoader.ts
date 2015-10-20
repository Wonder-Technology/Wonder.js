/// <reference path="../../definitions.d.ts"/>
module dy{
    export class OBJLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _mtlFileLoader:MTLLoader = MTLLoader.create();
        private _mtlFileUrlArr:Array<string> = null;
        private _objParser:OBJParser = OBJParser.create();


        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        //todo all Loader use the contract
        @In(function(...args){
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("js's url", "string"));
        })
        protected loadAsset(...args):dyRt.Stream {
            var self = this,
                url = args[0];

            return AjaxLoader.load(url, "text")
                .do((data:any) => {
                    self._read(data);
                }, null, null)
                .concat(
                    dyRt.judge(
                        () => { return self._mtlFileUrlArr.length > 0; },
                        () => {
                            return self._mtlFileLoader.load(self._mtlFileUrlArr);
                        },
                        () => {
                            return dyRt.empty();
                        }
                    )
                )
                .map((data:any)=> {
                    return self._createModel();
                });
        }

        private _read(data:string){
            //parse
        }

        private _createModel():GameObject{
            //clear obj and mtl data


            return GameObject.create();
        }
    }

    class MTLLoader{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _mtlParser:MTLParser = MTLParser.create();

        public load(urlArr:Array<string>):dyRt.Stream{
            var self = this;

            return dyRt.fromArray(urlArr)
                .flatMap((url:string) => {
                    return AjaxLoader.load(url, "text");
                })
                .do((data:string) => {
                    self._read(data);
                }, null, null)
                .concat(
                    dyRt.judge(
                        () => {
                            //return self._mtlFileUrlArr.length > 0;
                            //todo if has map url or not
                        },
                        () => {
                            //return self._mtlFileLoader.load(self._mtlFileUrlArr);
                            //todo load map
                        },
                        () => {
                            return dyRt.empty();
                        }
                    )
                )

        }

        public clearData(){
        }

        private _read(data:string){
            //read
        }
    }
}
