/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class MirrorShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "mirror";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            var stage = Director.getInstance().stage;

            //if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
            //    program.sendAttributeData("a_texCoord", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            //}

            //todo refactor
            program.sendUniformData("u_textureMatrix", VariableType.FLOAT_MAT4, stage.textureMatrix);
        }

        //todo refactor
        protected setShaderDefinition(){
            super.setShaderDefinition();

            //this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable(["u_textureMatrix", "u_mirrorSampler"]);


            //var vs = this.getVsChunk();
            //
            //this.vsSourceBody = ShaderSnippet.setPos_mvp + vs.body;
        }
    }
}

