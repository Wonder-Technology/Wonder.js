import {
    getClearColor, getGL, getViewport, setClearColor, setGL, setViewportOfGL,
    setViewportToState
} from "./DeviceManagerSystem";
import { getState, setState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { DeviceManagerData } from "./DeviceManagerData";
import { Color } from "../../structure/Color";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { buildViewportData as buildViewportDataWorkerSystem } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { setClearColorData } from "../utils/worker/both_file/device/deviceManagerUtils";

export const getDeviceManagerGL = () => {
    return getGL(DeviceManagerData, getState(DirectorData));
}

export const setDeviceManagerGL = (gl: WebGLRenderingContext) => {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
}

export const getDeviceManagerViewport = () => {
    return getViewport(getState(DirectorData));
}


export const getDeviceManagerClearColor = () => {
    return getClearColor(DeviceManagerData);
}

export var setDeviceManagerViewport = null,
    setDeviceManagerClearColor = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    setDeviceManagerViewport = (x: number, y: number, width: number, height: number) => {
        setState(setViewportToState(x, y, width, height, getState(DirectorData)), DirectorData).run();

        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_VIEWPORT,
            viewportData: buildViewportDataWorkerSystem(x, y, width, height)
        });
    }

    setDeviceManagerClearColor = (color: Color) => {
        setClearColorData(color, DeviceManagerData);

        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_CLEARCOLOR,
            clearColorArr4: color.toArray4()
        });
    }
}
else {
    setDeviceManagerViewport = (x: number, y: number, width: number, height: number) => {
        setState(
            setViewportOfGL(DeviceManagerData, getState(DirectorData), {
                x: x,
                y: y,
                width: width,
                height: height
            }
            ).run(), DirectorData
        ).run();
    }

    setDeviceManagerClearColor = (color: Color) => {
        setClearColor(getGL(DeviceManagerData, getState(DirectorData)), color, DeviceManagerData);
    }
}
