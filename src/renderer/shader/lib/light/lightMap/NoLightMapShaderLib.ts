module wd{
    export class NoLightMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noLightMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }
    }
}

