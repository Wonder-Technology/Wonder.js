/// <reference path="../../../../../filePath.d.ts"/>
module dy{
    export class NoShadowMapShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "noShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }
    }
}

