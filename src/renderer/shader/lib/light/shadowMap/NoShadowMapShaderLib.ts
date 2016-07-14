module wd{
    export class NoShadowMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "noShadowMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
        }
    }
}

