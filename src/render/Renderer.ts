/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Renderer{
        public skyboxCommand:QuadCommand = null;

        public createQuadCommand():QuadCommand{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public addCommand(command:QuadCommand){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public render(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public init(){
        }
    }
}

