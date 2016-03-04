module wd{
    export class MarbleProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:MarbleProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:MarbleProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "marble_proceduralTexture";

        private _proceduralTexture:MarbleProceduralTexture = null;

        //public sendShaderVariables(program:Program, cmd:ProceduralCommand, material:Material){
        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:MarbleProceduralTexture = this._proceduralTexture;

            this.sendAttributeData(program, "a_positionVec2", cmd.vertexBuffer);

            this.sendUniformData(program, "u_tilesHeightNumber", texture.tilesHeightNumber);
            this.sendUniformData(program, "u_tilesWidthNumber", texture.tilesWidthNumber);
            this.sendUniformData(program, "u_amplitude", texture.amplitude);
            this.sendUniformData(program, "u_jointColor", texture.jointColor.toVector3());
        }

        //public setShaderDefinition(cmd:ProceduralCommand, material:Material){
        public setShaderDefinition(cmd:ProceduralCommand){
            //super.setShaderDefinition(cmd, material);
            super.setShaderDefinition(cmd);

            this.addAttributeVariable(["a_positionVec2"]);

            this.addUniformVariable([
                "u_tilesHeightNumber", "u_tilesWidthNumber", "u_amplitude", "u_jointColor"
            ]);
        }
    }
}

