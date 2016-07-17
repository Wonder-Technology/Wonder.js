module wd{
    export class CloudProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:CloudProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:CloudProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "cloud_proceduralTexture";

        private _proceduralTexture:CloudProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:CloudProceduralTexture = this._proceduralTexture;

            this.sendUniformData(program, "u_skyColor", texture.skyColor.toVector4());
            this.sendUniformData(program, "u_cloudColor", texture.cloudColor.toVector4());
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_skyColor", "u_cloudColor"
            ]);
        }
    }
}

