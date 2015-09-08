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
        protected setShaderDefinition(options:{mode:CubemapMode}){
            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_sampler0", "u_cameraPos", "u_normalMatrix"]);

            switch (options.mode){
                case CubemapMode.REFLECTION:

                    this.vsSource = ShaderChunk.cubemap_vertex;
                    this.fsSource = ShaderChunk.cubemap_fragment;
                    break;
                case CubemapMode.REFRACTION:
                    this.addUniformVariable(["u_refractionRatio"]);

                    this.vsSource = ShaderChunk.refraction_vertex;
                    this.fsSource = ShaderChunk.refraction_fragment;
                    break;
                case CubemapMode.FRESNEL:
                    this.addUniformVariable(["u_refractionRatio"]);

                    this.vsSource = ShaderChunk.fresnel_vertex;
                    this.fsSource = ShaderChunk.fresnel_fragment;
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("CubemapMode"));
                    break;
            }
        }
    }
}

