module wd{
    export abstract class Renderer{
        public skyboxCommand:QuadCommand = null;

        public abstract addCommand(command:RenderCommand);
        public abstract hasCommand():boolean;
        public abstract render();
        public abstract clear();

        public init(){
        }
    }
}

