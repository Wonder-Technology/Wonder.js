import { getClearColor, getGL, getViewport, setClearColor, setGL, setViewportOfGL, setViewportToState } from "./DeviceManagerSystem";
import { getState, setState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { DeviceManagerData } from "./DeviceManagerData";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { buildViewportData as buildViewportDataWorkerSystem } from "../worker/both_file/device/DeviceManagerWorkerSystem";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { setClearColorData } from "../utils/worker/both_file/device/deviceManagerUtils";
export var getDeviceManagerGL = function () {
    return getGL(DeviceManagerData, getState(DirectorData));
};
export var setDeviceManagerGL = function (gl) {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
};
export var getDeviceManagerViewport = function () {
    return getViewport(getState(DirectorData));
};
export var getDeviceManagerClearColor = function () {
    return getClearColor(DeviceManagerData);
};
export var setDeviceManagerViewport = null, setDeviceManagerClearColor = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    setDeviceManagerViewport = function (x, y, width, height) {
        setState(setViewportToState(x, y, width, height, getState(DirectorData)), DirectorData).run();
        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_VIEWPORT,
            viewportData: buildViewportDataWorkerSystem(x, y, width, height)
        });
    };
    setDeviceManagerClearColor = function (color) {
        setClearColorData(color, DeviceManagerData);
        getRenderWorker(WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType.INIT_CLEARCOLOR,
            clearColorArr4: color.toArray4()
        });
    };
}
else {
    setDeviceManagerViewport = function (x, y, width, height) {
        setState(setViewportOfGL(DeviceManagerData, getState(DirectorData), {
            x: x,
            y: y,
            width: width,
            height: height
        }).run(), DirectorData).run();
    };
    setDeviceManagerClearColor = function (color) {
        setClearColor(getGL(DeviceManagerData, getState(DirectorData)), color, DeviceManagerData);
    };
}
//# sourceMappingURL=DeviceManager.js.map