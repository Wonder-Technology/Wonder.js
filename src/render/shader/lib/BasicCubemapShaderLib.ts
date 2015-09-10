/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class BasicCubemapShaderLib extends CubemapShaderLib{
        private static _instance:BasicCubemapShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.vsSourceHead = ShaderChunk.basic_cubemap_head_vertex;
            this.vsSourceBody += ShaderChunk.basic_cubemap_body_vertex;
            this.fsSourceHead = ShaderChunk.basic_cubemap_head_fragment;
            this.fsSourceBody = ShaderChunk.basic_cubemap_body_fragment;
        }
    }
}


