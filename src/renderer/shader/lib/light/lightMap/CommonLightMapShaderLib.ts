module wd{
    export class CommonLightMapShaderLib extends EngineShaderLib{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var texCoordBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.TEXCOORD);

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeData(program, "a_texCoord", texCoordBuffer);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);
        }
    }
}

