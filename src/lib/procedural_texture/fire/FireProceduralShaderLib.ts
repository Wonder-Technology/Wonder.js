module wd{
    export class FireProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:FireProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:FireProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "fire_proceduralTexture";

        private _proceduralTexture:FireProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:FireProceduralTexture = this._proceduralTexture;

            texture.computeTime();

            this.sendUniformData(program, "u_time", texture.time);
            this.sendUniformData(program, "u_speed", texture.speed);
            this.sendUniformData(program, "u_shift", texture.shift);
            this.sendUniformData(program, "u_alphaThreshold", texture.alphaThreshold);

            texture.fireColorMap.forEach((color:Color, name:string) => {
                program.sendStructureData(`u_fireColor.${name}`, EVariableType.VECTOR_3, color.toVector3());
            });
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            super.setShaderDefinition(cmd);

            this.addUniformVariable([
                "u_time", "u_speed", "u_shift", "u_alphaThreshold", "u_fireColor"
            ]);
        }
    }
}

