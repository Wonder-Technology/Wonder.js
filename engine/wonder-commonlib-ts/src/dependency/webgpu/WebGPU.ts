import * as IWebGPU from "./IWebGPU";

export let requestAdapter: IWebGPU.requestAdapter = () => {
	return (navigator as any).gpu.requestAdapter()
}

export let requestDevice: IWebGPU.requestDevice = (adapter) => {
	return adapter.requestDevice()
}


export let webgpu: IWebGPU.webgpu = {
	requestAdapter: requestAdapter,
	requestDevice: requestDevice
}