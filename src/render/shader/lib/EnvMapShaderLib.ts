/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class EnvMapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:Material) {
            if (quadCmd.buffers.hasChild("normalBuffer")) {
                program.sendAttributeData("a_normal", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", render.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", render.VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_samplerCube0", "u_cameraPos", "u_normalMatrix"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp;
        }

        protected setVsSource(){
            this.vsSourceHead = ShaderChunk.envMap_head_vertex;
            this.vsSourceBody += ShaderChunk.envMap_body_vertex;
        }
    }
}

