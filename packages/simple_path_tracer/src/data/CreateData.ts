type pass = {
	pixelBufferData: [GPUBuffer, Float32Array] | null,
	resolutionBufferData: [GPUBuffer, Float32Array] | null
}

type rayTracingPass = {
	bindGroup: GPUBindGroup | null,
	pipeline: GPUComputePipeline | null
}

type screenPass = {
	bindGroup: GPUBindGroup | null,
	pipeline: GPUComputePipeline | null
}

type gameObject = number
type transform = number
type geometry = number
type material = number

type state = {
	canvas: HTMLCanvasElement | null,
	adapter: GPUAdapter | null,
	device: GPUDevice | null,
	context: GPUCanvasContext | null,
	format: GPUTextureFormat | null,

	ecsData: Array<[gameObject, transform, geometry, material]>,
	transformBuffer: Float32Array | null,
	geometryBuffer: Float32Array | null,
	materialBuffer: Float32Array | null,

	pass: pass,
	rayTracingPass: rayTracingPass,
	screenPass: screenPass
}

export let createState = () => {
	return {
		canvas: null,
		adapter: null,
		device: null,
		context: null,
		format: null,
		// transformBuffer: new Float32Array(count * 2),
		// geometryBuffer: new Float32Array(count * 4),
		// materialBuffer: new Float32Array(count * 3),
		ecsData: [],
		transformBuffer: null,
		geometryBuffer: null,
		materialBuffer: null,
		pass: {
			pixelBufferData: null,
			resolutionBufferData: null
		},
		rayTracingPass: {
			bindGroup: null,
			pipeline: null
		},
		screenPass: {
			bindGroup: null,
			pipeline: null
		}
	}
}