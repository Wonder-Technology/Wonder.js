import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import {
    getContext, setCanvas
} from "../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { compose } from "../../utils/functionalUtils";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils, initData as initDataUtils, setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils,
    setPixelRatioAndCanvas as setPixelRatioAndCanvasUtils,
    setScreen as setScreenUtils,
    setViewport as setViewportUtils, setViewportOfGL as setViewportOfGLUtils
} from "../utils/device/deviceManagerUtils";

export var createGL = curry((canvas:HTMLCanvasElement, contextConfig: Map<string, any>, DeviceManagerData: any, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getContext(contextConfig, canvas);

        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(canvas), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
})

export var getGL = getGLUtils;

export var setGL = setGLUtils;

export var setContextConfig = setContextConfigUtils;

export var setPixelRatio = setPixelRatioUtils;

export var getViewport = getViewportUtils;

export var setViewport = setViewportUtils;

export var setPixelRatioAndCanvas = setPixelRatioAndCanvasUtils;

export var setViewportOfGL = setViewportOfGLUtils;

export var getScreenSize = getScreenSizeUtils;

export var setScreen = setScreenUtils;

export var clear = clearUtils;

export var setColorWrite = setColorWriteUtils;

export var initData = initDataUtils;
