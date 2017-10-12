import {
    setCanvas, setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX
} from "../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { chain, compose } from "../../utils/functionalUtils";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getOnlyGL, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils,
    initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils, setClearColor as setClearColorUtils,
    setColorWrite as setColorWriteUtils,
    setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils,
    setScreen as setScreenUtils, setSide as setSideUtils,
    setViewportToState as setViewportToStateUtils, setViewportOfGL as setViewportOfGLUtils
} from "../utils/worker/both_file/device/deviceManagerUtils";
import { Log } from "../../utils/Log";
import { Color } from "../../structure/Color";
import { ESide } from "../enum/ESide";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";

export const createGL = curry((canvas: HTMLCanvasElement, contextConfig: Map<string, any>, WebGLDetectData: any, DeviceManagerData: any, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getOnlyGL(canvas, contextConfig.get("options").toObject(), WebGLDetectData);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }

        return compose(setCanvas(canvas), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
})

export const getGL = getGLUtils;

export const setGL = setGLUtils;

export const setContextConfig = setContextConfigUtils;

export const setPixelRatio = setPixelRatioUtils;

export const getViewport = getViewportUtils;

export const setViewportToState = setViewportToStateUtils;

export const setViewportOfGL = setViewportOfGLUtils;

export const setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas: HTMLCanvasElement, state: Map<any, any>) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return state;
        }

        let pixelRatio = setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();

        return setPixelRatio(pixelRatio, state);
    });
});

export const getScreenSize = getScreenSizeUtils;

export const setScreen = curry((canvas: HTMLCanvasElement, DeviceManagerData: any, DomQuery: any, state: Map<any, any>) => {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerData, state, DomQuery);
});

const _setScreenData = curry((DeviceManagerData: any, canvas: HTMLCanvasElement, state: Map<any, any>, data: any) => {
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

        return setViewportOfGL(DeviceManagerData, state, data).run();
    });
})

export const clear = clearUtils;

export const getClearColor = (DeviceManagerData: any) => {
    return DeviceManagerData.clearColor;
}

export const setClearColor = setClearColorUtils;

export const setColorWrite = setColorWriteUtils;

export const setSide = setSideUtils;

export const initData = initDataUtils;
