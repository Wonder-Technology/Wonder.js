"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var WorkerDetectSystem_1 = require("../device/WorkerDetectSystem");
var WebGLRenderSystem_1 = require("../renderer/render/WebGLRenderSystem");
var SendDrawRenderCommandBufferData_1 = require("../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData");
var ERenderWorkerState_1 = require("../renderer/worker/both_file/ERenderWorkerState");
var ThreeDTransformSystem_1 = require("../component/transform/ThreeDTransformSystem");
var GlobalTempData_1 = require("../definition/GlobalTempData");
var ThreeDTransformData_1 = require("../component/transform/ThreeDTransformData");
var CameraControllerSystem_1 = require("../component/camera/CameraControllerSystem");
var PerspectiveCameraData_1 = require("../component/camera/PerspectiveCameraData");
var CameraData_1 = require("../component/camera/CameraData");
var CameraControllerData_1 = require("../component/camera/CameraControllerData");
exports.getState = function (DirectorData) {
    return DirectorData.state;
};
exports.setState = function (state, DirectorData) {
    return IO_1.IO.of(function () {
        DirectorData.state = state;
    });
};
exports.run = null;
exports.render = null;
var _sync = function (elapsed, state, scheduler) {
    scheduler.update(elapsed);
    var resultState = exports.updateSystem(elapsed, state);
    return resultState;
};
exports.updateSystem = function (elapsed, state) {
    var resultState = ThreeDTransformSystem_1.update(elapsed, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData, state);
    resultState = CameraControllerSystem_1.update(PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData, CameraControllerData_1.CameraControllerData);
    return resultState;
};
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.run = function (elapsed, state, timeController, scheduler) {
        var resultState = state;
        if (SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state === ERenderWorkerState_1.ERenderWorkerState.DRAW_COMPLETE) {
            timeController.tick(elapsed);
            SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state = ERenderWorkerState_1.ERenderWorkerState.DEFAULT;
            resultState = _sync(elapsed, state, scheduler);
        }
        else if (SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state !== ERenderWorkerState_1.ERenderWorkerState.DRAW_WAIT) {
            SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state = ERenderWorkerState_1.ERenderWorkerState.DRAW_WAIT;
            resultState = exports.render(resultState);
        }
        return resultState;
    };
    exports.render = function (state) {
        var resultState = null;
        resultState = WebGLRenderSystem_1.render(state);
        return resultState;
    };
}
else {
    exports.run = function (elapsed, state, timeController, scheduler) {
        var resultState = state;
        timeController.tick(elapsed);
        resultState = _sync(elapsed, state, scheduler);
        resultState = exports.render(resultState);
        return resultState;
    };
    exports.render = function (state) {
        var resultState = WebGLRenderSystem_1.render(state);
        return resultState;
    };
}
//# sourceMappingURL=DirectorSystem.js.map