import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../renderer/device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { compose } from "../utils/functionalUtils";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { fromJS, Map } from "immutable";
import { detect as detectWorker } from "../device/WorkerDetectSystem";
import { createCanvas, initDevice } from "../renderer/device/initDeviceSystem";
import { ContextConfigOptionsData } from "../renderer/type/dataType";

export var getIsTest = (MainData: any) => {
    return MainData.isTest;
}

export var setIsTest = (isTest: boolean, MainData: any) => {
    return IO.of(() => {
        MainData.isTest = isTest;
    });
}

export var setLibIsTest = (isTest: boolean) => {
    return IO.of(() => {
        Main.isTest = isTest;
    });
}

export var setConfig = (closeContractTest: boolean, MainData: any, {
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

export var init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>, DomQuery:any) => {
    it("should set config before", () => {
        expect(configState.get("useDevicePixelRatio")).exist;
    })
}, (gameState: Map<string, any>, configState: Map<any, any>, DomQuery:any) => {
    return compose(
        initDevice(configState.get("contextConfig"), gameState, configState),
        createCanvas(DomQuery)
    )(configState.get("canvasId"));
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
