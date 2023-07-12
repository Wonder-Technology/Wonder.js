import { fragmentShader, vertexShader } from "../../shader/screen";

export let exec = (state) => {
	let { device, format } = state

	const pipeline = device.createRenderPipeline({
		layout: 'auto',
		vertex: {
			module: device.createShaderModule({
				code: vertexShader,
			}),
			entryPoint: 'main',
		},
		fragment: {
			module: device.createShaderModule({
				code: fragmentShader,
			}),
			entryPoint: 'main',
			targets: [
				{
					format
				},
			],
		},
		primitive: {
			topology: 'triangle-list',
		},
		// vertexState: {
		// 	indexFormat: "uint32",
		// 	vertexBuffers: []
		// },
		// colorStates: [{
		// 	format: swapChainFormat,
		// 	alphaBlend: {},
		// 	colorBlend: {}
		// }]
	});


	let { pixelBufferData, resolutionBufferData } = state.pass

	let [pixelBuffer, pixelBufferSize] = pixelBufferData;
	let [resolutionBuffer, resolutionData] = resolutionBufferData;

	let bindGroup = device.createBindGroup({
		layout: pipeline.getBindGroupLayout(0),
		entries: [
			{
				binding: 0,
				resource: {
					buffer: pixelBuffer,
					size: pixelBufferSize
				},
			},
			{
				binding: 1,
				resource: {
					buffer: resolutionBuffer,
					size: resolutionData.byteLength
				},
			},
		],
	});

	return {
		...state,
		screenPass: {
			bindGroup,
			pipeline
		}
	}
}
