/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export abstract class BuildShadowMapShaderLib extends ShaderLib{
        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.setFsSource(this.getFsChunk("commonBuildShadowMap_fragment.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

