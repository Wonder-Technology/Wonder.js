module wd{
    export class ProceduralShader extends Shader{
        public static create(){
            var obj = new this();

            return obj;
        }

        protected libs:wdCb.Collection<ProceduralShaderLib>;

        public update(cmd:ProceduralCommand, material:Material){
            var program = this.program;

            this.judgeRefreshShader();

            this.program.use();

            this.libs.forEach((lib:ProceduralShaderLib) => {
                lib.sendShaderVariables(program, cmd, material);
            });
        }

        @ensure(function(){
            var self = this;

            this.libs.forEach((lib:ProceduralShaderLib) => {
                assert(JudgeUtils.isEqual(lib.shader, self), Log.info.FUNC_SHOULD("set ProceduralShaderLib.shader to be this"));
            });

            assert(this.libDirty === true, Log.info.FUNC_SHOULD("libDirty", "be true"));

            assert(this.libs.getCount() === 1, Log.info.FUNC_SHOULD("only has one ProceduralShaderLib"));
        })
        public addLib(lib:ProceduralShaderLib){
            this.libs.removeAllChildren();

            super.addLib(lib);
        }
    }
}

