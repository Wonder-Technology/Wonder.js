module wd{
    export abstract class BuildShadowMapShaderLib extends EngineShaderLib{
        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.setFsSource(this.getFsChunk("commonBuildShadowMap_fragment.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

