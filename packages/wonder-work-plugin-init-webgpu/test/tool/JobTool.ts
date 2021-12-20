import { convertStreamToPromise } from "../../../wonder-commonlib-ts/src/JobUtils";
import { execFunc, states } from "../../src/Type";
import { getData } from "../../src/Main"
import { buildFakeCanvas } from "./SceneGraphRepoTool";

function _buildStates(canvas: HTMLCanvasElement): states {
    return {
        "wonder-work-plugin-init-webgpu": getData(canvas).createStateFunc()
    }
}

export function execJob(execFunc: execFunc, canvas: HTMLCanvasElement = buildFakeCanvas()[0], states: states = _buildStates(canvas)) {
    return convertStreamToPromise(execFunc(states))
}
