import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import { Map } from "immutable";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";
import { render as renderByWebGLRender } from "../renderer/core/WebGLRenderSystem";
import { SendDrawRenderCommandBufferData } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { ERenderWorkerState } from "../renderer/worker/both_file/ERenderWorkerState";
import { Scheduler } from "./Scheduler";
import { update as updateThreeDTransform } from "../component/transform/ThreeDTransformSystem";
import { GlobalTempData } from "../definition/GlobalTempData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { update as updateCameraControllerSystem } from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
import { createState } from "../utils/stateUtils";

export var getState = (DirectorData: any) => {
    return DirectorData.state;
}

export var setState = (state: Map<any, any>, DirectorData: any) => {
    return IO.of(() => {
        DirectorData.state = state;
    });
}

export var markIsInit = (DirectorData: any) => {
    DirectorData.isInit = true;
}

export var isInit = (DirectorData: any) => {
    return DirectorData.isInit === true;
}

export var run = null;

export var render = null;

var _sync = (elapsed: number, state: Map<any, any>, scheduler: Scheduler) => {
    scheduler.update(elapsed);

    var resultState = updateSystem(elapsed, state);

    return resultState;
}

export var updateSystem = (elapsed: number, state: Map<any, any>) => {
    var resultState = updateThreeDTransform(elapsed, GlobalTempData, ThreeDTransformData, state);

    resultState = updateCameraControllerSystem(PerspectiveCameraData, CameraData, CameraControllerData, state);

    return resultState;
}

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    run = (elapsed: number, state: Map<any, any>, timeController: DirectorTimeController, scheduler: Scheduler) => {
        var resultState: Map<any, any> = state;

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
    }

    render = (state: Map<any, any>) => {
        var resultState = null;

        resultState = renderByWebGLRender(state)

        return resultState;
    }
}
else {
    run = (elapsed: number, state: Map<any, any>, timeController: DirectorTimeController, scheduler: Scheduler) => {
        var resultState: Map<any, any> = state;

        timeController.tick(elapsed);

        resultState = _sync(elapsed, state, scheduler);
        resultState = render(resultState);

        return resultState;
    }

    render = (state: Map<any, any>) => {
        var resultState = renderByWebGLRender(state);

        return resultState;
    }
}

export var initData = (DirectorData: any) => {
    // DirectorData.state = createState();
    // DirectorData.isInit = false;
}
