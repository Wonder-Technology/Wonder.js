import { buildSceneAccelerationStructureBufferData, buildSceneGeometryDataBufferData, buildSceneInstanceDataBufferData, buildSceneMaterialDataBufferData } from "../../render_data/buildRenderData";
import { computeShader } from "../../shader/ray_tracing";

export let exec = (state) => {
	let { device } = state

	const computeBindGroupLayout = device.createBindGroupLayout({
		entries: [
			{ binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
			{ binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
			{ binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
			{ binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
			{ binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: "read-only-storage" } },
			{ binding: 5, visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT, buffer: { type: "storage" } },
			{ binding: 6, visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT, buffer: { type: "uniform" } },
		],
	});


	const computePipelineLayout = device.createPipelineLayout({
		bindGroupLayouts: [computeBindGroupLayout],
	});


	const pipeline = device.createComputePipeline({
		layout: computePipelineLayout,
		compute: {
			module: device.createShaderModule({ code: computeShader }),
			entryPoint: 'main',
		},
	});


	let { pixelBufferData, resolutionBufferData } = state.pass

	let [pixelBuffer, pixelBufferSize] = pixelBufferData;
	let [resolutionBuffer, resolutionData] = resolutionBufferData;


	let [
		topLevelBuffer, topLevelBufferSize,
		bottomLevelBuffer, bottomLevelBufferSize
	] = buildSceneAccelerationStructureBufferData(state, device);
	let [geometryDataBuffer, geometryDataBufferSize] = buildSceneGeometryDataBufferData(state, device);
	let [instanceDataBuffer, instanceDataBufferSize] = buildSceneInstanceDataBufferData(state, device);
	let [materialDataBuffer, materialDataBufferSize] = buildSceneMaterialDataBufferData(state, device);

	let bindGroup = device.createBindGroup({
		layout: pipeline.getBindGroupLayout(0),
		entries: [
			{
				binding: 0,
				resource: {
					buffer: topLevelBuffer,
					size: topLevelBufferSize
				},
			},
			{
				binding: 1,
				resource: {
					buffer: bottomLevelBuffer,
					size: bottomLevelBufferSize
				},
			},
			{
				binding: 2,
				resource: {
					buffer: instanceDataBuffer,
					size: instanceDataBufferSize
				},
			},
			{
				binding: 3,
				resource: {
					buffer: geometryDataBuffer,
					size: geometryDataBufferSize
				},
			},
			{
				binding: 4,
				resource: {
					buffer: materialDataBuffer,
					size: materialDataBufferSize
				},
			},
			{
				binding: 5,
				resource: {
					buffer: pixelBuffer,
					size: pixelBufferSize
				},
			},
			{
				binding: 6,
				resource: {
					buffer: resolutionBuffer,
					size: resolutionData.byteLength
				},
			},
		],
	});

	return {
		...state,
		rayTracingPass: {
			bindGroup,
			pipeline
		}
	}
}