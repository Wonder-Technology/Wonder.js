module wd{
    export class BasicEndShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basicEnd";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:EngineMaterial){
        }
    }
}

