import { convertStreamToPromise } from "../../../wonder-commonlib-ts/src/JobUtils";
import { execFunc, states } from "../../src/Type";

function _buildStates(): states {
    return {
        "wonder-work-plugin-root": {}
    }
}

export function execJob(execFunc: execFunc, states: states = _buildStates()) {
    return convertStreamToPromise(execFunc(states))
}