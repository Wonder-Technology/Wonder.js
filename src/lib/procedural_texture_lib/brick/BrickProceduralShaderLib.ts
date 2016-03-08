module wd{
    export class BrickProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:BrickProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:BrickProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "brick_proceduralTexture";

        private _proceduralTexture:BrickProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:BrickProceduralTexture = this._proceduralTexture;

            this.sendUniformData(program, "u_tilesWidthNumber", texture.tilesWidthNumber);
            this.sendUniformData(program, "u_tilesHeightNumber", texture.tilesHeightNumber);
            this.sendUniformData(program, "u_brickColor", texture.brickColor.toVector3());
            this.sendUniformData(program, "u_jointColor", texture.jointColor.toVector3());
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_tilesHeightNumber", "u_tilesWidthNumber", "u_brickColor", "u_jointColor"
            ]);
        }
    }
}

