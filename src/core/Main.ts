import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Main as Main$ } from "wonder-frp/dist/es2015/core/Main";
import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { DeviceManager } from "../device/DeviceManager";
import { GPUDetector } from "../device/GPUDetector";
import { CompileConfig } from "../config/CompileConfig";

@registerClass("Main")
export class Main {
    private static _isTest: boolean = false;
    static get isTest() {
        return this._isTest;
    }
    static set isTest(isTest: boolean) {
        this._isTest = isTest;

        Main$.isTest = isTest;
    }

    public static screenSize: any = null;

    private static _canvasId: string = null;
    private static _contextConfig: ContextConfigData = null;
    private static _useDevicePixelRatio: boolean = null;

    public static setConfig({
            canvasId = null,
        isTest = DebugConfig.isTest,
        screenSize = EScreenSize.FULL,
        useDevicePixelRatio = false,
        contextConfig = {
            options: {
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }
        }
        }) {
        this.screenSize = screenSize;
        this._canvasId = canvasId;
        this._useDevicePixelRatio = useDevicePixelRatio;
        this._contextConfig = {
            options: ExtendUtils.extend({
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }, contextConfig.options)
        };

        this._setIsTest(isTest);

        return this;
    }

    public static init() {
        DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig, this._useDevicePixelRatio);
        DeviceManager.getInstance().setScreen();
        GPUDetector.getInstance().detect();

        return this;
    }

    private static _setIsTest(isTestFromDebugConfig: boolean) {
        if (CompileConfig.closeContractTest) {
            this.isTest = false;
        }
        else {
            this.isTest = isTestFromDebugConfig;
        }
    }
}

export type ContextConfigData = {
    options: {
        alpha: boolean;
        depth: boolean;
        stencil: boolean;
        antialias: boolean;
        premultipliedAlpha: boolean;
        preserveDrawingBuffer: boolean;
    }
}