/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class BasicMapShaderLib extends MapShaderLib{
        private static _instance:BasicMapShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }
    }
}

