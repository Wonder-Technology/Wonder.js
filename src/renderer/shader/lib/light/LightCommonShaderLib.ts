module wd{
    export class LightCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "lightCommon";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){

        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.setVsSource(this.getVsChunk("light_common.glsl"));
            this.setVsSource(this.getVsChunk(), "+");

            this.setFsSource(this.getFsChunk("light_common.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

