module wd{
    export class WoodProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:WoodProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:WoodProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "wood_proceduralTexture";

        private _proceduralTexture:WoodProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:WoodProceduralTexture = this._proceduralTexture;

            this.sendUniformData(program, "u_ampScale", texture.ampScale);
            this.sendUniformData(program, "u_woodColor", texture.woodColor.toVector3());
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_ampScale", "u_woodColor"
            ]);
        }
    }
}

