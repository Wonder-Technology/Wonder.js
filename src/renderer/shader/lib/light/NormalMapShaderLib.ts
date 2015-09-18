/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class NormalMapShaderLib extends LightMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "normalMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            super.sendShaderVariables(program, quadCmd, material);

            if(quadCmd.buffers.hasChild("tangentBuffer")){
                program.sendAttributeData("a_tangent", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("tangentBuffer"));
            }
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addAttributeVariable(["a_tangent"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("normalMap")
            ]);

            this.vsSourceVarDeclare += this.getVsChunk("light_common.glsl").varDeclare;
        }
    }
}

