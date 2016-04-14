module wd{
    export class RenderTargerRendererShaderLibUtils{
        public static judgeAndSendIsRenderListEmptyVariable(program:Program, glslDataKey:EShaderGLSLData);
        public static judgeAndSendIsRenderListEmptyVariable(program:Program, glslDataKey:EShaderGLSLData, variableName:string);

        public static judgeAndSendIsRenderListEmptyVariable(...args){
            var glslData = null,
                program = args[0],
                glslDataKey = args[1],
                variableName:string = null;

            glslData = Director.getInstance().scene.glslData.getChild(<any>glslDataKey);

            if(!glslData){
                return;
            }

            if(args.length === 3){
                variableName = args[2];
            }
            else{
                variableName = "u_isRenderListEmpty";
            }

            if(glslData.isRenderListEmpty){
                program.sendUniformData(variableName, EVariableType.NUMBER_1, 1);
            }
            else{
                program.sendUniformData(variableName, EVariableType.NUMBER_1, 0);
            }
        }
    }
}
