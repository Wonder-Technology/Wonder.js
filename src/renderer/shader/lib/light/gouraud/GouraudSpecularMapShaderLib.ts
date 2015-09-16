/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class GouraudSpecularMapShaderLib extends SpecularMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setSourceContent(){
            this.vsSourceHead = ShaderChunk.specularMap_gouraud_head_vertex;
        }
    }
}

