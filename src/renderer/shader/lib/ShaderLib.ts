module wd{
    export abstract class ShaderLib{
        public shader:Shader = null;

        @virtual
        public sendShaderVariables(program: Program, cmd:RenderCommand, material:Material){
        }

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }
    }
}
