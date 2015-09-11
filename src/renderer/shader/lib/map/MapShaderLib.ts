/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class MapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
                program.sendAttributeData("a_texCoord", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            }
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable(["u_sampler2D0", "u_sourceRegion", "u_repeatRegion"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp;

            this.vsSourceHead = ShaderChunk.map_head_vertex;
            this.vsSourceBody += ShaderChunk.map_body_vertex;
            this.fsSourceHead = ShaderChunk.map_head_fragment;
            this.fsSourceBody = ShaderChunk.map_body_fragment;
        }
    }
}

