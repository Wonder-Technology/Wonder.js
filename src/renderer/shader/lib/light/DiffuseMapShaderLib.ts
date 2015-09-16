/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class DiffuseMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
                program.sendAttributeData("a_texCoord", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            }
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap")
]);

            this.vsSourceHead = ShaderChunk.diffuseMap_head_vertex;
            this.vsSourceBody = ShaderChunk.diffuseMap_body_vertex;
            this.fsSourceHead = ShaderChunk.diffuseMap_head_fragment;
        }
    }
}

