import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";
import { render as renderByWebGLRender } from "../renderer/core/WebGLRenderSystem";
import { SendDrawRenderCommandBufferData } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { ERenderWorkerState } from "../renderer/worker/both_file/ERenderWorkerState";
import { update as updateThreeDTransform } from "../component/transform/ThreeDTransformSystem";
import { GlobalTempData } from "../definition/GlobalTempData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { update as updateCameraControllerSystem } from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
export var getState = function (DirectorData) {
    return DirectorData.state;
};
export var setState = function (state, DirectorData) {
    return IO.of(function () {
        DirectorData.state = state;
    });
};
export var markIsInit = function (DirectorData) {
    DirectorData.isInit = true;
};
export var isInit = function (DirectorData) {
    return DirectorData.isInit === true;
};
export var run = null;
export var render = null;
var _sync = function (elapsed, state, scheduler) {
    scheduler.update(elapsed);
    var resultState = updateSystem(elapsed, state);
    return resultState;
};
export var updateSystem = function (elapsed, state) {
    var resultState = updateThreeDTransform(elapsed, GlobalTempData, ThreeDTransformData, state);
    resultState = updateCameraControllerSystem(PerspectiveCameraData, CameraData, CameraControllerData, state);
    return resultState;
};
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    run = function (elapsed, state, timeController, scheduler) {
        var resultState = state;
        if (SendDrawRenderCommandBufferData.state === ERenderWorkerState.INIT_COMPLETE) {
            SendDrawRenderCommandBufferData.isInitComplete = true;
            SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
        }
        else if (!SendDrawRenderCommandBufferData.isInitComplete) {
            return resultState;
        }
        if (SendDrawRenderCommandBufferData.state === ERenderWorkerState.DRAW_COMPLETE) {
            timeController.tick(elapsed);
            SendDrawRenderCommandBufferData.state = ERenderWorkerState.DEFAULT;
            resultState = _sync(elapsed, state, scheduler);
        }
        else if (SendDrawRenderCommandBufferData.state !== ERenderWorkerState.DRAW_WAIT) {
            SendDrawRenderCommandBufferData.state = ERenderWorkerState.DRAW_WAIT;
            resultState = render(resultState);
        }
        return resultState;
    };
    render = function (state) {
        var resultState = null;
        resultState = renderByWebGLRender(state);
        return resultState;
    };
}
else {
    run = function (elapsed, state, timeController, scheduler) {
        var resultState = state;
        timeController.tick(elapsed);
        resultState = _sync(elapsed, state, scheduler);
        resultState = render(resultState);
        return resultState;
    };
    render = function (state) {
        var resultState = renderByWebGLRender(state);
        return resultState;
    };
}
export var initData = function (DirectorData) {
};
//# sourceMappingURL=DirectorSystem.js.map