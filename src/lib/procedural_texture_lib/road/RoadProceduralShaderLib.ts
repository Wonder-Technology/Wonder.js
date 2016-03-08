module wd{
    export class RoadProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:RoadProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:RoadProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "road_proceduralTexture";

        private _proceduralTexture:RoadProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand) {
            var texture:RoadProceduralTexture = this._proceduralTexture;

            this.sendUniformData(program, "u_roadColor", texture.roadColor.toVector3());
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_roadColor"
            ]);
        }
    }
}

