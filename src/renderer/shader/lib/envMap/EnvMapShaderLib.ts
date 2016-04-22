module wd{
    export abstract class EnvMapShaderLib extends EngineShaderLib{
        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_samplerCube0"
            ]);

            this.vsSourceBody = this.getVsChunk().body;
        }
    }
}

