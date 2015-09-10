/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class ReflectionShaderLib extends CubemapShaderLib{
        private static _instance:ReflectionShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_refractionRatio"]);

            this.setVsSource();
            this.fsSourceHead = ShaderChunk.cubemap_head_fragment;
            this.fsSourceBody = ShaderChunk.cubemap_body_fragment + ShaderChunk.reflection_body_fragment;
        }
    }
}


