import { context } from "../../../wonder-commonlib-ts/src/dependency/webgpu/IWebGPU";

export function createFakeWebGLContext() {
	return {
	} as context;
}

export function buildFakeCanvas() {
	let fakeContext = createFakeWebGLContext()

	return [{
		getContext() {
			return fakeContext
		}
	} as any as HTMLCanvasElement, fakeContext]
}
