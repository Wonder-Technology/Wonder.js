import { EWorkerOperateType } from "../EWorkerOperateType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getViewport as getViewportUtils,
    initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils,
    setSide as setSideUtils,
    setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils,
    setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils,
    setViewportToState as setViewportToStateUtils, setViewportOfGL as setViewportOfGLUtils, setClearColor as setClearColorUtils
} from "../../../utils/worker/both_file/device/deviceManagerUtils";
import { chain, compose } from "../../../../utils/functionalUtils";
import { setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../../../structure/ViewSystem";
import { ScreenData, ViewportData } from "../../../type/messageDataType";
import { isValueExist } from "../../../../utils/stateUtils";
import { Color } from "../../../../structure/Color";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { ESide } from "../../../enum/ESide";
import { RectRegion } from "../../../../structure/RectRegion";

export const createGL = curry((canvas: HTMLCanvasElement, renderWorker: Worker, contextConfig: Map<string, any>, viewportData: ViewportData) => {
    return IO.of(() => {
        var offscreen = (<any>canvas).transferControlToOffscreen();

        renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject(),
            viewportData: viewportData
        }, [offscreen]);
    })
})

export const setContextConfig = setContextConfigUtils;

export const getGL = getGLUtils;

export const setGL = setGLUtils;

export const setPixelRatio = setPixelRatioUtils;

export const getViewport = getViewportUtils;

export const setViewportToState = curry((viewportData: ViewportData | null, state: Map<any, any>) => {
    if (viewportData === null) {
        return state;
    }

    return setViewportToStateUtils(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});

export const getViewportData = (screenData: ScreenData) => {
    var {
        x,
        y,
        width,
        height
    } = screenData;

    return {
        x: x,
        y: y,
        width: width,
        height: height
    }
}

export const setViewportOfGL = curry((DeviceManagerWorkerData: any, data: RectRegion, state: Map<any, any>) => {
    return setViewportOfGLUtils(DeviceManagerWorkerData, state, data);
})

export const setScreen = curry((canvas: HTMLCanvasElement, DeviceManagerWorkerData: any, DomQuery: any, state: Map<any, any>) => {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerWorkerData, state, DomQuery);
});

const _setScreenData = curry((DeviceManagerWorkerData: any, canvas: HTMLCanvasElement, state: Map<any, any>, data: any) => {
    var {
        x,
        y,
        width,
        height,
        styleWidth,
        styleHeight
    } = data;

    return IO.of(() => {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();

        return data;
    });
})

export const setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas: HTMLCanvasElement) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return null;
        }

        return setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();
    });
});

export const buildViewportData = (x: number, y: number, width: number, height: number) => {
    return {
        x: x,
        y: y,
        width: width,
        height: height
    }
}

export const setClearColor = (gl: WebGLRenderingContext, colorArr4: Array<number>, DeviceManagerWorkerData: any) => {
    var color = Color.create();

    color.r = colorArr4[0];
    color.g = colorArr4[1];
    color.b = colorArr4[2];
    color.a = colorArr4[3];

    setClearColorUtils(gl, color, DeviceManagerWorkerData);
};

export const clear = clearUtils;

export const setColorWrite = setColorWriteUtils;

export const setSide = setSideUtils;

export const initData = initDataUtils;
