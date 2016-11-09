module wd{
    export class EndBasicShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "end_basic";

        public setShaderDefinition(cmd:QuadCommand, material:StandardBasicMaterial){
            super.setShaderDefinition(cmd, material);

            if(material.alphaTest !== null){
                this.fsSourceBody += `if (gl_FragColor.a < ${material.alphaTest}){
    discard;
}\n`;
            }
        }
    }
}

