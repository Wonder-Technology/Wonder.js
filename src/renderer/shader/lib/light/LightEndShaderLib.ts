module wd{
    export class LightEndShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "lightEnd";

        public setShaderDefinition(cmd:QuadCommand, material:LightMaterial){
            super.setShaderDefinition(cmd, material);

            //todo test
            if(material.alphaTest !== null){
                this.fsSourceBody += `if (totalColor.a < ${material.alphaTest}){
    discard;
}\n`;
            }
        }
    }
}

