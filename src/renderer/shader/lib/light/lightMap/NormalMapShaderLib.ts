module wd{
    export class NormalMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normalMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            var tangentBuffer:ArrayBuffer = null;

            super.sendShaderVariables(program, cmd, material);

            tangentBuffer = cmd.buffers.getChild(EBufferDataType.TANGENT);

            if(!tangentBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_tangent", tangentBuffer);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_tangent"]);

            this.addUniformVariable([
                VariableNameTable.getVariableName("normalMap")
            ]);
        }
    }
}

