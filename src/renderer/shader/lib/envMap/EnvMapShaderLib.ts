module wd{
    export abstract class EnvMapShaderLib extends EngineShaderLib{
        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                "u_samplerCube0"
            ]);

            this.vsSourceBody = this.getVsChunk().body;
        }
    }
}

