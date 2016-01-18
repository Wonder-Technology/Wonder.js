module wd{
    export class Main{
        private static _isTest:boolean = false;
        static get isTest(){
            return this._isTest;
        }
        static set isTest(isTest:boolean){
            this._isTest = isTest;

            wdFrp.Main.isTest = isTest;
        }

        public static screenSize:any = null;

        private static _canvasId:string = null;

        public static setConfig({
            canvasId,
            isTest = DebugConfig.isTest,
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
