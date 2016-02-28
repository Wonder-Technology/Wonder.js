module wd{
    export class NormalMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normalMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var tangentBuffer:ArrayBuffer = null;

            super.sendShaderVariables(program, quadCmd, material);

            tangentBuffer = quadCmd.buffers.getChild(EBufferDataType.TANGENT);

            if(!tangentBuffer){
                return;
            }

            this.sendAttributeData(program, "a_tangent", tangentBuffer);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_tangent"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("normalMap")
            ]);
        }
    }
}

