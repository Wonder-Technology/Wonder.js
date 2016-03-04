module wd{
    export abstract class BuildShadowMapShaderLib extends EngineShaderLib{
        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.setFsSource(this.getFsChunk("commonBuildShadowMap_fragment.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

