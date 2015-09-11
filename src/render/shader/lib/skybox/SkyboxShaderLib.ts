/// <reference path="../../../../definitions.d.ts"/>
module dy.render{
    export class SkyboxShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:Material){
                if (quadCmd.buffers.hasChild("normalBuffer")) {
                    program.sendAttributeData("a_normal", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
                }
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_samplerCube0"]);

            this.vsSourceHead = ShaderChunk.skybox_head_vertex;
            this.vsSourceBody = ShaderChunk.skybox_body_vertex;
            this.fsSourceHead = ShaderChunk.skybox_head_fragment;
            this.fsSourceBody = ShaderChunk.skybox_body_fragment;
        }
    }
}

