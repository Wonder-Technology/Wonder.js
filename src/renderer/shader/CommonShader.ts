module wd{
    export class CommonShader extends Shader{
        public static create(){
        	var obj = new this();

        	return obj;
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = this.program;

            this.judgeRefreshShader();

            this.program.use();

            this.libs.forEach((lib:ShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            program.sendAttributeDataFromCustomShader();
            program.sendUniformDataFromCustomShader();

            material.mapManager.sendData(program);
        }

        public read(definitionData:ShaderDefinitionData){
            this.sourceBuilder.read(definitionData);

            this.libDirty = true;
        }
    }

    export type ShaderDefinitionData = {
        vsSourceTop:string;
        vsSourceDefine:string;
        vsSourceVarDeclare:string;
        vsSourceFuncDeclare:string;
        vsSourceFuncDefine:string;
        vsSourceBody:string;
        fsSourceTop:string;
        fsSourceDefine:string;
        fsSourceVarDeclare:string;
        fsSourceFuncDeclare:string;
        fsSourceFuncDefine:string;
        fsSourceBody:string;
        attributes:ShaderData|wdCb.Hash<ShaderData>;
        uniforms:ShaderData|wdCb.Hash<ShaderData>;
    }
}
