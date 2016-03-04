module wd{
    export class LightEndShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "lightEnd";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }
    }
}

