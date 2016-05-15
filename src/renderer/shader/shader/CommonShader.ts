module wd{
    export class CommonShader extends EngineShader{
        public static create(){
        	var obj = new this();

        	return obj;
        }

        public update(quadCmd:QuadCommand, material:Material){
            var program = null;

            this.judgeRefreshShader(quadCmd, material);

            program = this.program;

            program.use();

            this.libs.forEach((lib:EngineShaderLib) => {
                lib.sendShaderVariables(program, quadCmd, material);
            });

            this.mapManager.bindAndUpdate();
            this.mapManager.sendData(program);
        }
    }
}
