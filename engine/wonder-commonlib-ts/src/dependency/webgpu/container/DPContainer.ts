import { webgpu } from "../IWebGPU";

type dpContainer = {
    webgpu: webgpu | null
}

let dpContainer: dpContainer = {
    webgpu: null
}

export function getWebGPUExn() {
    if (dpContainer.webgpu === null) {
        throw new Error("webgpu shoudn't be null!");
    }
    return dpContainer.webgpu;
}

export function setWebGPU(webgpu: webgpu) {
    dpContainer.webgpu = webgpu;
}