/// <reference path="../filePath.d.ts"/>
module dy{
    export class GLSLLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(arg):dyRt.Stream {
            var url = arguments[0];

            return AjaxLoader.load(url, "text");
        }
    }
}
