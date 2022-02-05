import { execFunc } from "../Type"
import { fromPromise, just } from "most"
import { getWebGPUExn } from "../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"

export let exec: execFunc = (states) => {
    return fromPromise(
        getWebGPUExn().requestAdapter()
    ).flatMap((adapter) => {
        return fromPromise(getWebGPUExn().requestDevice(adapter)).flatMap((device) => {
            return just({
                ...states,
                "wonder-work-plugin-init-webgpu": {
                    ...states["wonder-work-plugin-init-webgpu"],
                    adapter: adapter,
                    device: device
                }
            })
        })
    })
}


