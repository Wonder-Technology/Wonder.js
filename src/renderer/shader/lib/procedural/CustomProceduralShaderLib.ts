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

            uniformMap.forEach((uniform:ShaderData, name:string) => {
                CustomShaderLibUtils.sendUniformData(name, uniform.type, uniform.value, program);
            });
        }

        public setShaderDefinition(cmd:ProceduralCommand){
            var texture:CustomProceduralTexture = this._proceduralTexture;

            super.setShaderDefinition(cmd);

            this.setFsSource(texture.fsSource);
        }
    }
}

