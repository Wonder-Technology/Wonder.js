module wd{
    export class RenderTargerRendererShaderLibUtils{
        public static judgeAndSendIsRenderListEmptyVariable(program:Program, glslDataKey:EShaderGLSLData){
            var glslData = null;

            glslData = Director.getInstance().scene.glslData.getChild(<any>glslDataKey);

            if(!glslData){
                return;
            }

            if(glslData.isRenderListEmpty){
                program.sendUniformData("u_isRenderListEmpty", EVariableType.NUMBER_1, 1);
            }
            else{
                program.sendUniformData("u_isRenderListEmpty", EVariableType.NUMBER_1, 0);
            }
        }
    }
}
