/// <reference path="../../../../filePath.d.ts"/>
module dy{
    export class BasicEndShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "basicEnd";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:Material){
        }
    }
}

