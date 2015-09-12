/// <reference path="../definitions.d.ts"/>
module dy{
    export class Main{
        public static setConfig(config:MainConfig){
            //todo set more global config
            this._canvasId = config.canvasId;

            this._globalInit();
        }

        private static _canvasId:string = null;

        private static _globalInit(){
            dy.Director.getInstance().createGL(this._canvasId);
            GPUDetector.getInstance().detect();
        }
    }

    export type MainConfig = {
        canvasId:string;
    };
}
