module wd{
    export class EndShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "end";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            program.sendAllBufferData(quadCmd.vaoManager);
        }
    }
}

