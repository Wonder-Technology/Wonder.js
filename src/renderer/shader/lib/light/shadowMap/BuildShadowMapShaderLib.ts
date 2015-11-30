/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export abstract class BuildShadowMapShaderLib extends ShaderLib{
        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.setFsSource(this.getFsChunk("commonBuildShadowMap_fragment.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

