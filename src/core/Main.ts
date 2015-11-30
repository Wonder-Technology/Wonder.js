/// <reference path="../filePath.d.ts"/>
module wd{
    export class Main{
        public static isTest:boolean = null;
        public static screenSize:any = null;

        private static _canvasId:string = null;

        public static setConfig({
            isTest = Config.isTest,
            canvasId,
            screenSize = ScreenSize.FULL
            }){
            this.isTest = isTest;
            this.screenSize = screenSize;
            this._canvasId = canvasId;

            return this;
        }

        private static init(){
            wd.DeviceManager.getInstance().createGL(this._canvasId);
            wd.DeviceManager.getInstance().setScreen();
            GPUDetector.getInstance().detect();

            return this;
        }
    }
}
