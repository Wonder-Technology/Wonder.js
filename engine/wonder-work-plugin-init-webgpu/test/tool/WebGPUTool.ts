import { setWebGPU } from "../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"

export function createWebGPU(sandbox) {
	return {
		requestAdapter: sandbox.stub(),
		requestDevice: sandbox.stub(),
	}
}

export function prepareWebGPU(sandbox) {
	setWebGPU(createWebGPU(sandbox))
}