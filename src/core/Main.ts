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
        private static _contextConfig:ContextConfigData = null;

        public static setConfig({
            canvasId = null,
            isTest = DebugConfig.isTest,
            screenSize = EScreenSize.FULL,
            contextConfig = {
                options:{
                    alpha:true,
                    depth:true,
                    stencil:false,
                    antialias:true,
                    premultipliedAlpha:true,
                    preserveDrawingBuffer:false
                }
            }
            }){
            this.isTest = isTest;
            this.screenSize = screenSize;
            this._canvasId = canvasId;
            this._contextConfig = {
                options:wdCb.ExtendUtils.extend({
                        alpha:true,
                        depth:true,
                        stencil:false,
                        antialias:true,
                        premultipliedAlpha:true,
                        preserveDrawingBuffer:false
                }, contextConfig.options)
            };

            return this;
        }

        private static init(){
            wd.DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig);
            wd.DeviceManager.getInstance().setScreen();
            GPUDetector.getInstance().detect();

            return this;
        }
    }

    export type ContextConfigData = {
        options:{
            alpha:boolean;
            depth:boolean;
            stencil:boolean;
            antialias:boolean;
            premultipliedAlpha:boolean;
            preserveDrawingBuffer:boolean;
        }
    }
}
