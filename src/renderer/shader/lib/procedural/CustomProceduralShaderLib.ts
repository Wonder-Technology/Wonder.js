module wd{
    export class CustomProceduralShaderLib extends ProceduralShaderLib{
        public static create(proceduralTexture:CustomProceduralTexture) {
            var obj = new this(proceduralTexture);

            return obj;
        }

        constructor(proceduralTexture:CustomProceduralTexture){
            super();

            this._proceduralTexture = proceduralTexture;
        }

        public type:string = "custom_proceduralTexture";

        private _proceduralTexture:CustomProceduralTexture = null;

        public sendShaderVariables(program:Program, cmd:ProceduralCommand){
            var texture:CustomProceduralTexture = this._proceduralTexture,
                uniformMap:wdCb.Hash<ShaderData> = texture.uniformMap;

            this.sendAttributeData(program, "a_positionVec2", cmd.vertexBuffer);

            uniformMap.forEach((uniform:ShaderData, name:string) => {
                program.sendUniformData(name, uniform.type, uniform.value);
            });
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            var texture:CustomProceduralTexture = this._proceduralTexture;

            super.setShaderDefinition(cmd);

            this.addAttributeVariable(["a_positionVec2"]);

            this.setFsSource(texture.fsSource);
        }
    }
}

