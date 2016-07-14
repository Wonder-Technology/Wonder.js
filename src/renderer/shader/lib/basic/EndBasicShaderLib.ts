module wd{
    export class EndBasicShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "end_basic";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:EngineMaterial){
        }
    }
}

