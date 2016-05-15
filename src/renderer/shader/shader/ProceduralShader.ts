module wd{
    export abstract class ProceduralShader extends EngineShader{
        protected libs:wdCb.Collection<ProceduralShaderLib>;

        public init(){
            this.addLib(CommonProceduralShaderLib.create());

            super.init(null);
        }

        public update(cmd:ProceduralCommand){
            var program = null;

            this.judgeRefreshShader(cmd, null);

            program = this.program;

            program.use();

            this.libs.forEach((lib:ProceduralShaderLib) => {
                lib.sendShaderVariables(program, cmd);
            });
        }
    }
}

