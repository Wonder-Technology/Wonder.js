/// <reference path="../filePath.d.ts"/>
module wd{
    export abstract class Renderer{
        public skyboxCommand:QuadCommand = null;

        public abstract createQuadCommand();
        public abstract addCommand(command:QuadCommand);
        public abstract hasCommand():boolean;
        public abstract render();

        public init(){
        }
    }
}

