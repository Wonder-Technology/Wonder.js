/// <reference path="../definitions.d.ts"/>
module dy{
    export class JsLoader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _container:dyCb.Hash<string> = dyCb.Hash.create<string>();

        public load(url:string, id:string):dyRt.Stream{
            var self = this,
                stream = null;

            if(this._container.getChild(id)){
                stream = dyRt.empty();
            }
            else{
                stream = dyRt.fromPromise(this._load(url))
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

        private _load(url) {
            var self = this;

            return new RSVP.Promise((resolve, reject) => {
                var script:any = self._createScript();

                script.addEventListener("error", function (e) {
                    reject(e);
                });

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            resolve(url);
                        }
                    };
                }
                else { //Others
                    script.onload = function () {
                        resolve(url);
                    };
                }

                // set the src attribute after the onload callback is set, to avoid an instant loading failing to fire the callback
                script.src = url;

                this._appendScript(script);
            });
        }

        private _createScript() {
            var script = document.createElement("script");
            script.type = "text/javascript";

            //// use async=false to force scripts to execute in order
            //script.async = false;

            return script;
        }

        private _errorHandle(path, err) {
            dyCb.Log.log("加载" + path + "资源失败");
        }

        private _appendScript(script) {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}
