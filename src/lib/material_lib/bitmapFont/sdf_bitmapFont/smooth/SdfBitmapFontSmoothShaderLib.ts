module wd{
    export class SdfBitmapFontSmoothShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "sdf_bitmapFont_smooth";

        public setShaderDefinition(cmd:QuadCommand, material:SdfBitmapFontMaterial){
            super.setShaderDefinition(cmd, material);

            if(GPUDetector.getInstance().extensionStandardDerivatives){
                this.fsSourceExtensionList.addChild("GL_OES_standard_derivatives");
                this.fsSourceFuncDefine = ShaderChunk.sdf_bitmapFont_smoothStep_standardDerivatives.funcDefine;
            }
            else{
                this.fsSourceFuncDefine = ShaderChunk.sdf_bitmapFont_smoothStep_fallback.funcDefine;
            }

            this.fsSourceBody += `
                if (gl_FragColor.a < ${material.alphaTest}){
                    discard;
                }
            `;
        }
    }
}

