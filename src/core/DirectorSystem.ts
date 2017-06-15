import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { Map } from "immutable";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";
import { render as renderByWorkerTime } from "../renderer/worker/logic_file/core/WorkerTimeSystem";
import { WorkerConfig } from "../config/WorkerConfig";
import { WorkerTimeData } from "../renderer/worker/logic_file/core/WorkerTimeData";
import { render as renderByWebGLRender } from "../renderer/render/WebGLRenderSystem";

export var getState = (DirectorData: any) => {
    return DirectorData.state;
}

export var setState = (state: Map<any, any>, DirectorData: any) => {
    return IO.of(() => {
        DirectorData.state = state;
    });
}

export var render = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    render = (deltaTime: number, state: Map<any, any>) => {
        var resultState = null;

        renderByWorkerTime(deltaTime, (elapsed: number) => {
            resultState = renderByWebGLRender(state)
        }, WorkerConfig, WorkerTimeData);

        return resultState;
    }
}
else {
    render = (deltaTime: number, state: Map<any, any>) => {
        var resultState = renderByWebGLRender(state);

        return resultState;
    }
}
