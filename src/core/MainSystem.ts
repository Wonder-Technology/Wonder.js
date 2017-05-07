import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { createGL, setPixelRatioAndCanvas, setScreen } from "../device/DeviceManagerSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { chain, compose, map } from "../utils/functionalUtils";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { fromJS, Map } from "immutable";
import { detect } from "../device/GPUDetectorSystem";
import { trace } from "../utils/debugUtils";
import { MainData } from "./MainData";
// import { getIsTest as getIsTestInUtils } from "../utils/MainUtils";

export var getIsTest = (MainData:any) => {
    return MainData.isTest;
}

export var setIsTest = (isTest: boolean, MainData:any) => {
    return IO.of(() => {
        MainData.isTest = isTest;
    });
}

export var setLibIsTest = (isTest: boolean) => {
    return IO.of(() => {
        Main.isTest = isTest;
    });
}

export var getScreenSize = (state: Map<any, any>) => {
    return state.getIn(["Main", "screenSize"]);
}

export var setConfig = (closeContractTest: boolean, MainData:any, {
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
        var _isTest = false;

        if (CompileConfig.closeContractTest) {
            _isTest = false;
            setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            setLibIsTest(isTest).run();
        }

        setIsTest(_isTest, MainData).run();

        return fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils.extend({
                        alpha: true,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: true,
                        preserveDrawingBuffer: false
                    }, contextConfig.options)
                },
                useDevicePixelRatio: useDevicePixelRatio
            }
        });
    });
}

export var init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>) => {
    it("should set config before", () => {
        expect(configState.get("useDevicePixelRatio")).exist;
    })
}, (gameState: Map<string, any>, configState: Map<any, any>) => {
    return compose(map(detect), chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))), chain(setScreen), createGL, )(configState.get("canvasId"), configState.get("contextConfig"), gameState);
});


export type ContextConfigData = {
    options: ContextConfigOptionsData;
}

export type MainConfigData = {
    canvasId?: string;
    isTest?: boolean;
    screenSize?: any;
    useDevicePixelRatio?: boolean;
    contextConfig?: ContextConfigData;
}


export type ContextConfigOptionsData = {
    alpha: boolean;
    depth: boolean;
    stencil: boolean;
    antialias: boolean;
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
}
