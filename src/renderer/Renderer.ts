/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class Renderer{
        public skyboxCommand:QuadCommand = null;

        public abstract createQuadCommand();

        public abstract addCommand(command:QuadCommand);

        public abstract render();

        public init(){
        }
    }
}

