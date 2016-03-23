module wd{
    export abstract class ProceduralShader extends EngineShader{
        protected libs:wdCb.Collection<ProceduralShaderLib>;

        public init(){
            this.addLib(CommonProceduralShaderLib.create());

            super.init(null);
        }

        public update(cmd:ProceduralCommand){
            var program = this.program;

            this.judgeRefreshShader(cmd, null);

            this.program.use();

            this.libs.forEach((lib:ProceduralShaderLib) => {
                lib.sendShaderVariables(program, cmd);
            });
        }
    }
}

