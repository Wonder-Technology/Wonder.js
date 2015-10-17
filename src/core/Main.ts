/// <reference path="../definitions.d.ts"/>
module dy{
    export class Main{
        public static isTest:boolean = Config.isTest;

        private static _canvasId:string = null;

        public static setConfig({
            canvasId,
            isTest=Config.isTest
            }){
            this.isTest = isTest;
            this._canvasId = canvasId;

            this._globalInit();
        }

        private static _globalInit(){
            dy.Director.getInstance().createGL(this._canvasId);
            GPUDetector.getInstance().detect();
        }
    }
}
