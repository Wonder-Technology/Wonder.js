module wd{
    export class NoNormalMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noNormalMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
        }
    }
}

