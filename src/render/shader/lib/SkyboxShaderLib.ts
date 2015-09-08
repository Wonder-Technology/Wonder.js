/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class SkyboxShaderLib extends ShaderLib{
        private static _instance:SkyboxShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        //todo typescript define options' type
        protected setShaderDefinition(options:any){
            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_sampler0"]);

            this.vsSource = ShaderChunk.skybox_vertex;
            this.fsSource = ShaderChunk.skybox_fragment;
        }
    }
}

