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
        private static _useDevicePixelRatio:boolean = null;

        public static setConfig({
            canvasId = null,
            isTest = DebugConfig.isTest,
            screenSize = EScreenSize.FULL,
            useDevicePixelRatio = false,
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
            this.screenSize = screenSize;
            this._canvasId = canvasId;
            this._useDevicePixelRatio = useDevicePixelRatio;
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

            this._setIsTest(isTest);

            return this;
        }

        public static init(){
            wd.DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig, this._useDevicePixelRatio);
            wd.DeviceManager.getInstance().setScreen();
            GPUDetector.getInstance().detect();

            return this;
        }

        private static _setIsTest(isTestFromDebugConfig:boolean){
            if(CompileConfig.closeContractTest){
                this.isTest = false;
            }
            else{
                this.isTest = isTestFromDebugConfig;
            }
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

