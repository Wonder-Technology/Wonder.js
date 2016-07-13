//todo test
module wd{
    export class SdfFontSmoothShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "sdf_font_smooth";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:SdfFontMaterial){
            //var texCoordBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.TEXCOORD);
            //
            //if(!texCoordBuffer){
            //    return;
            //}

            //this.sendAttributeBuffer(program, "a_texCoord", texCoordBuffer);
            //this.sendUniformData(program, "u_opacity", material.opacity);
            this.sendUniformData(program, "u_alphaTest", material.alphaTest);
        }

        public setShaderDefinition(cmd:QuadCommand, material:MirrorMaterial){
            super.setShaderDefinition(cmd, material);

            //this.addAttributeVariable(["a_texCoord"]);
            this.addUniformVariable(["u_sampler2D0", "u_alphaTest"]);

            if(GPUDetector.getInstance().extensionStandardDerivatives){
                this.fsSourceExtensionList.addChild("GL_OES_standard_derivatives");
                this.fsSourceFuncDefine = ShaderChunk.sdf_font_smoothStep_standardDerivatives.funcDefine;
            }
            else{
                this.fsSourceFuncDefine = ShaderChunk.sdf_font_smoothStep_fallback.funcDefine;
            }
        }
    }
}

