/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class CubemapShaderLib extends ShaderLib{
        private static _instance:CubemapShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        //todo typescript define options' type
        protected setShaderDefinition(options:any){
            this.addAttributeVariable(["a_normal"]);

            if(options.reflect) {
                this.addUniformVariable(["u_sampler0", "u_cameraPos", "u_normalMatrix"]);

                this.vsSource = ShaderChunk.cubemap_vertex;
                this.fsSource = ShaderChunk.cubemap_fragment;
            }
            if(options.refract){
                this.addUniformVariable(["u_sampler0", "u_cameraPos", "u_normalMatrix", "u_refractionRatio"]);

                this.vsSource = ShaderChunk.refraction_vertex;
                this.fsSource = ShaderChunk.refraction_fragment;
            }
            if(options.fresnel){
                this.addUniformVariable(["u_sampler0", "u_cameraPos", "u_normalMatrix", "u_refractionRatio"]);

                this.vsSource = ShaderChunk.fresnel_vertex;
                this.fsSource = ShaderChunk.fresnel_fragment;
            }
        }
    }
}

