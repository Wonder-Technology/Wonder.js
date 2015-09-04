/// <reference path="../definitions.d.ts"/>
module dy{
    export class GLSLLoader extends Loader{
        private static _instance:GLSLLoader = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        protected loadAsset(arg):dyRt.Stream {
            var url = arguments[0];

            dyCb.Log.error(JudgeUtils.isArray(url), dyCb.Log.info.FUNC_MUST_BE("glsl's url", "string"));

            return AjaxLoader.load(url, "text");
        }
    }
}
