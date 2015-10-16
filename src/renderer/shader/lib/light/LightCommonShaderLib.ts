/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class LightCommonShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "lightCommon";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){

        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.setVsSource(this.getVsChunk("light_common.glsl"));
            this.setVsSource(this.getVsChunk(), "+");

            this.setFsSource(this.getFsChunk("light_common.glsl"));
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

