import { data } from "./Data";

export let getCanvas = () => {
    return data.canvas;
}

export let setCanvas = (canvas) => {
    data.canvas = canvas;
}


export let getConfig = () => {
    return data.config;
}

export let setConfig = (config) => {
    data.config = config;
}

export let getScene = () => {
    return data.scene;
}

export let setScene = (scene) => {
    data.scene = scene;
}

export let getWebGPU = () => {
    return data.webgpu;
}

export let setWebGPU = (webgpu) => {
    data.webgpu = webgpu;
}

export let getCamera = () => {
    return data.camera;
}

export let setCamera = (camera) => {
    data.camera = camera;
}

export let getPass = () => {
    return data.pass;
}

export let setPass = (pass) => {
    data.pass = pass;
}

export let getRayTracingPass = () => {
    return data.rayTracingPass;
}

export let setRayTracingPass = (rayTracingPass) => {
    data.rayTracingPass = rayTracingPass;
}

export let getScreenPass = () => {
    return data.screenPass;
}

export let setScreenPass = (screenPass) => {
    data.screenPass = screenPass;
}