import { renderWorkerConfig } from "../renderWorkerConfig";
import { EWorkerOperateType } from "../EWorkerOperateType";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import {
    getContext, setCanvas
} from "../../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { compose } from "../../../utils/functionalUtils";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils, initData as initDataUtils, setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils,
    setPixelRatioAndCanvas as setPixelRatioAndCanvasUtils,
    setScreen as setScreenUtils,
    setViewport as setViewportUtils, setViewportOfGL as setViewportOfGLUtils
} from "../../utils/device/deviceManagerUtils";
import { Color } from "../../../structure/Color";

export var createGL = curry((canvas:HTMLCanvasElement, contextConfig: Map<string, any>, DeviceManagerWorkerData: any, state: Map<any, any>) => {
    return IO.of(() => {
        //todo set canvas elsewhere
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        var offscreen = (<any>canvas).transferControlToOffscreen();

        DeviceManagerWorkerData.renderWorker = new Worker(renderWorkerConfig.workerFilePath);

        DeviceManagerWorkerData.renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject()
        }, [offscreen]);

        return state;
    })
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

