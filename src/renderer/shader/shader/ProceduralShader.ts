module wd{
    export abstract class ProceduralShader extends EngineShader{
        protected libs:wdCb.Collection<ProceduralShaderLib>;

        public init(){
            this.addLib(CommonProceduralShaderLib.create());

            super.init();
        }

        public update(cmd:ProceduralCommand){
            var program = this.program;

            this.judgeRefreshShader();

            this.program.use();

            this.libs.forEach((lib:ProceduralShaderLib) => {
                lib.sendShaderVariables(program, cmd);
            });
        }
    }
}

