module wd{
    export class CommonProceduralShaderLib extends ProceduralShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common_proceduralTexture";

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            this.sendAttributeData(program, "a_positionVec2", cmd.vertexBuffer);
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addAttributeVariable(["a_positionVec2"]);
        }
    }
}

