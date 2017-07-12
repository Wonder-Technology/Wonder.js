import { EWorkerOperateType } from "../EWorkerOperateType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    clear as clearUtils,
    getGL as getGLUtils, getViewport as getViewportUtils,
    initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils,
    setSide as setSideUtils,
    setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils,
    setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils, setViewport as setViewportUtils
} from "../../../utils/device/deviceManagerUtils";
import { chain, compose } from "../../../../utils/functionalUtils";
import { setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../../../structure/ViewSystem";
import { ScreenData, ViewportData } from "../../../type/messageDataType";
import { isValueExist } from "../../../../utils/stateUtils";
import { setRenderWorker } from "../../logic_file/worker_instance/WorkerInstanceSystem";
import { Color } from "../../../../structure/Color";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { ESide } from "../../../enum/ESide";

export var createGL = curry((canvas: HTMLCanvasElement, WorkerInstanceData: any, contextConfig: Map<string, any>, viewportData: ViewportData, renderWorkerFilePath: string) => {
    return IO.of(() => {
        var offscreen = (<any>canvas).transferControlToOffscreen(),
            renderWorker = new Worker(renderWorkerFilePath);

        renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject(),
            viewportData: viewportData
        }, [offscreen]);

        setRenderWorker(renderWorker, WorkerInstanceData);
    })
})

export var setContextConfig = setContextConfigUtils;

export var getGL = getGLUtils;

export var setGL = setGLUtils;

export var setPixelRatio = setPixelRatioUtils;

export var getViewport = getViewportUtils;

export var setViewport = curry((viewportData: ViewportData | null, state: Map<any, any>) => {
    if (viewportData === null) {
        return state;
    }

    return setViewportUtils(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});

export var getViewportData = (screenData: ScreenData, state: Map<any, any>) => {
    var oldViewportData = getViewport(state),
        {
            x,
            y,
            width,
            height
        } = screenData;

    if (isValueExist(oldViewportData) && oldViewportData.x === x && oldViewportData.y === y && oldViewportData.width === width && oldViewportData.height === height) {
        return null;
    }

    return {
        x: x,
        y: y,
        width: width,
        height: height
    }
}

export var setViewportOfGL = curry((DeviceManagerWorkerData: any, {
    x,
    y,
    width,
    height
}, state: Map<any, any>) => {
    return IO.of(() => {
        var gl = getGL(DeviceManagerWorkerData, state);

        gl.viewport(x, y, width, height);

        return state;
    });
})

export var setScreen = curry((canvas: HTMLCanvasElement, DeviceManagerWorkerData: any, state: Map<any, any>) => {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerWorkerData, state);
});

var _setScreenData = curry((DeviceManagerWorkerData: any, canvas: HTMLCanvasElement, state: Map<any, any>, data: any) => {
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

export var setCanvasPixelRatio = curry((useDevicePixelRatio: boolean, canvas: HTMLCanvasElement) => {
    return IO.of(() => {
        if (!useDevicePixelRatio) {
            return null;
        }

        return setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();
    });
});

export var clear = clearUtils;

export var setColorWrite = setColorWriteUtils;

export var setSide = setSideUtils;

export var initData = initDataUtils;
