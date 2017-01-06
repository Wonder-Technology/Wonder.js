module wd{
    export class TotalShadowMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "totalShadowMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
        }
    }
}

