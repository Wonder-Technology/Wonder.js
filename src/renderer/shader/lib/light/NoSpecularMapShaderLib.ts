/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class NoSpecularMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.color.toVector3());
        }

        protected setShaderDefinition(){
            this.addUniformVariable(["u_specular"]);

            this.fsSourceHead = ShaderChunk.noSpecularMap_head_fragment;
        }
    }
}

