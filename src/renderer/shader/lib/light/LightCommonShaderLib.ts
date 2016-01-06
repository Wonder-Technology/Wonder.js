module wd{
    export class LightCommonShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "lightCommon";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){

        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.setVsSource(this.getVsChunk("light_common.glsl"));
            this.setVsSource(this.getVsChunk(), "+");

            this.setFsSource(this.getFsChunk("light_common.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

