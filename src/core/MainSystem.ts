import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { MainData } from "./MainData";
import { RectRegion } from "../structure/RectRegion";
import { createGL, setPixelRatioAndCanvas, setScreen } from "../device/DeviceManagerSystem";
import flow from "wonder-lodash/flow";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { chain } from "../utils/functionalUtils";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { GPUDetector } from "../device/GPUDetector";

var _canvasId: string = null,
    _useDevicePixelRatio: boolean = null,
    _contextConfig: ContextConfigData = null;

export var getIsTest = (MainData: any) => {
    return MainData.isTest;
}

export var setIsTest = (MainData: any, isTest: boolean) => {
    return IO.of(() => {
        MainData.isTest = isTest;
        Main.isTest = isTest;
    });
}

export var getScreenSize = (MainData: any) => {
    return MainData.screenSize;
}

export var setConfig = (closeContractTest: boolean, {
    canvasId = "",
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
}) => {
    return IO.of(() => {
        MainData.screenSize = <EScreenSize & RectRegion>screenSize;
        _canvasId = canvasId;
        _contextConfig = {
            options: ExtendUtils.extend({
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }, contextConfig.options)
        };

        if (CompileConfig.closeContractTest) {
            setIsTest(MainData, false).run();
        }
        else {
            setIsTest(MainData, isTest).run();
        }

        _useDevicePixelRatio = useDevicePixelRatio;
    });
}

export var init = requireCheckFunc(() => {
    it("should set config before", () => {
        expect(_useDevicePixelRatio).exist;
    })
}, () => {
    return IO.of(() => {
        flow(createGL, chain(setScreen), chain(setPixelRatioAndCanvas(_useDevicePixelRatio)))(_canvasId, _contextConfig).run();

        //todo extract GPUDetectorSystem
        GPUDetector.getInstance().detect();
    });
});


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

export type MainConfigData = {
    canvasId?: string;
    isTest?: boolean;
    screenSize?: any;
    useDevicePixelRatio?: boolean;
    contextConfig?: ContextConfigData;
}
