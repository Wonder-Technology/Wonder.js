"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceManagerSystem_1 = require("./DeviceManagerSystem");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var DeviceManagerData_1 = require("./DeviceManagerData");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var DeviceManagerWorkerSystem_1 = require("../worker/both_file/device/DeviceManagerWorkerSystem");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
var WorkerInstanceData_1 = require("../../worker/WorkerInstanceData");
var EWorkerOperateType_1 = require("../worker/both_file/EWorkerOperateType");
var deviceManagerUtils_1 = require("../utils/worker/both_file/device/deviceManagerUtils");
exports.getDeviceManagerGL = function () {
    return DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.setDeviceManagerGL = function (gl) {
    return DeviceManagerSystem_1.setGL(gl, DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getDeviceManagerViewport = function () {
    return DeviceManagerSystem_1.getViewport(DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
exports.getDeviceManagerClearColor = function () {
    return DeviceManagerSystem_1.getClearColor(DeviceManagerData_1.DeviceManagerData);
};
exports.setDeviceManagerViewport = null, exports.setDeviceManagerClearColor = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.setDeviceManagerViewport = function (x, y, width, height) {
        DirectorSystem_1.setState(DeviceManagerSystem_1.setViewportToState(x, y, width, height, DirectorSystem_1.getState(DirectorData_1.DirectorData)), DirectorData_1.DirectorData).run();
        WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_VIEWPORT,
            viewportData: DeviceManagerWorkerSystem_1.buildViewportData(x, y, width, height)
        });
    };
    exports.setDeviceManagerClearColor = function (color) {
        deviceManagerUtils_1.setClearColorData(color, DeviceManagerData_1.DeviceManagerData);
        WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData).postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_CLEARCOLOR,
            clearColorArr4: color.toArray4()
        });
    };
}
else {
    exports.setDeviceManagerViewport = function (x, y, width, height) {
        DirectorSystem_1.setState(DeviceManagerSystem_1.setViewportOfGL(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData), {
            x: x,
            y: y,
            width: width,
            height: height
        }).run(), DirectorData_1.DirectorData).run();
    };
    exports.setDeviceManagerClearColor = function (color) {
        DeviceManagerSystem_1.setClearColor(DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData)), color, DeviceManagerData_1.DeviceManagerData);
    };
}
//# sourceMappingURL=DeviceManager.js.map