module wd{
    export class GrassProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:GrassProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:GrassProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "grass_proceduralTexture";

        private _proceduralTexture:GrassProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:GrassProceduralTexture = this._proceduralTexture;

            this.sendUniformData(program, "u_herb1Color", texture.herb1Color.toVector3());
            this.sendUniformData(program, "u_herb2Color", texture.herb2Color.toVector3());
            this.sendUniformData(program, "u_herb3Color", texture.herb3Color.toVector3());
            this.sendUniformData(program, "u_groundColor", texture.groundColor.toVector3());
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_herb1Color", "u_herb2Color", "u_herb3Color", "u_groundColor"
            ]);
        }
    }
}

