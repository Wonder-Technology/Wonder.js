/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    //todo support more than 2 maps
    export class MultiMapShaderLib extends MapShaderLib{
        private static _instance:MultiMapShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_sampler2D1"]);

            this.fsSourceBody = ShaderChunk.multi_map_body_fragment;
        }
    }
}

