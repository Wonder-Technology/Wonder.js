module wd{
    declare var document:any;

    @singleton()
    export class JsLoader extends Loader{
        public static getInstance():any {}

		private constructor(){super();}

        protected loadAsset(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var self = this,
                url = args[0];

            return wdFrp.fromPromise(new RSVP.Promise((resolve, reject) => {
                var script:any = self._createScript();

                // use async=false to force scripts to execute in order
                script.async = false;

                script.addEventListener("error", function (e) {
                    //todo get error message from e(Event)?
                    reject(`load js file error. url:${url}`);
                });

                //IE
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            resolve(url);
                        }
                    };
                }
                else {
                    script.onload = function () {
                        resolve(url);
                    };
                }

                /*! set the src attribute after the onload callback is set, to avoid an instant loading failing to fire the callback */
                script.src = url;

                this._appendScript(script);
            }));
        }

        private _createScript() {
            var script = document.createElement("script");

            script.type = "text/javascript";

            return script;
        }

        private _appendScript(script) {
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}
