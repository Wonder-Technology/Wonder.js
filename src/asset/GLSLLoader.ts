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

        protected loadAsset(url:string):dyRt.Stream {
            return AjaxLoader.load(url, "text");
        }
    }
}
