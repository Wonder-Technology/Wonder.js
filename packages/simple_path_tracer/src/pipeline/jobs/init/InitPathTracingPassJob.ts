import { getWebGPU, getPass, getCamera, setRayTracingPass } from "../../../data/Repo"
// import { computeShader } from "../../shader/ray_tracing";
import { buildBRDFLambertianMaterialBufferData, buildBRDFSpecularReflectionMaterialBufferData, buildIndexBufferData, buildPointIndexBufferData, buildSceneAccelerationStructureBufferData, buildSceneInstanceDataBufferData, buildVertexBufferData } from "../../../render_data/buildRenderData";
import { computeShader } from "../../../shader/ray_tracing";

export let exec = () => {
    let { device } = getWebGPU();

    let bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 1,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 2,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 3,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 4,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 5,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 6,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 7,
                visibility: GPUShaderStage.COMPUTE,
                type: "read-only-storage"
            },
            {
                binding: 8,
                visibility: GPUShaderStage.COMPUTE,
                type: "uniform"
            },
            {
                binding: 9,
                visibility: GPUShaderStage.COMPUTE,
                type: "storage"
            },
            {
                binding: 10,
                visibility: GPUShaderStage.COMPUTE,
                type: "uniform"
            },
            {
                binding: 11,
                visibility: GPUShaderStage.COMPUTE,
                type: "uniform"
            },
            {
                binding: 12,
                visibility: GPUShaderStage.COMPUTE,
                type: "uniform"
            }
        ]
    });

    let { commonDataBufferData, pixelBufferData, resolutionBufferData } = getPass();
    let [commonDataBuffer, commonDataData] = commonDataBufferData;
    // console.log(commonDataData)
    let [pixelBuffer, pixelBufferSize] = pixelBufferData;
    let [resolutionBuffer, resolutionData] = resolutionBufferData;

    let { cameraBufferData } = getCamera();
    let [cameraBuffer, cameraData] = cameraBufferData;

    let [
        topLevelBuffer, topLevelBufferSize,
        bottomLevelBuffer, bottomLevelBufferSize
    ] = buildSceneAccelerationStructureBufferData(device);

    let [instanceDataBuffer, instanceDataBufferSize] = buildSceneInstanceDataBufferData(device);
    let [pointIndexBuffer, pointIndexBufferSize] = buildPointIndexBufferData(device);
    let [vertexBuffer, vertexBufferSize] = buildVertexBufferData(device);
    let [indexBuffer, indexBufferSize] = buildIndexBufferData(device);
    let [brdfLambertianMaterialBuffer, brdfLambertianMaterialBufferSize] = buildBRDFLambertianMaterialBufferData(device);
    let [brdfSpecularReflectionMaterialBuffer, brdfSpecularReflectionMaterialBufferSize] = buildBRDFSpecularReflectionMaterialBufferData(device);

    let [rectAreaLightBuffer, rectAreaLightBufferData] = brdfSpecularReflectionMaterialBufferSize(device)

    let bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: topLevelBuffer,
                    size: topLevelBufferSize
                }
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
                }
            },
            {
                binding: 3,
                resource: {
                    buffer: pointIndexBuffer,
                    size: pointIndexBufferSize
                }
            },
            {
                binding: 4,
                resource: {
                    buffer: vertexBuffer,
                    size: vertexBufferSize
                }
            },
            {
                binding: 5,
                resource: {
                    buffer: indexBuffer,
                    size: indexBufferSize
                }
            },
            {
                binding: 6,
                resource: {
                    buffer: brdfLambertianMaterialBuffer,
                    size: brdfLambertianMaterialBufferSize
                }
            },
            {
                binding: 7,
                resource: {
                    buffer: brdfSpecularReflectionMaterialBuffer,
                    size: brdfSpecularReflectionMaterialBufferSize
                }
            },
            {
                binding: 8,
                resource: {
                    buffer: rectAreaLightBuffer,
                    size: rectAreaLightBufferData.byteLength
                }
            },
            {
                binding: 9,
                resource: {
                    buffer: pixelBuffer,
                    size: pixelBufferSize
                }
            },
            {
                binding: 10,
                resource: {
                    buffer: cameraBuffer,
                    size: cameraData.byteLength
                }
            },
            {
                binding: 11,
                resource: {
                    buffer: resolutionBuffer,
                    size: resolutionData.byteLength
                }
            },
            {
                binding: 12,
                resource: {
                    buffer: commonDataBuffer,
                    size: commonDataData.byteLength
                }
            }
        ]
    });

    let pipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout]
        }),
        compute: {
			module: device.createShaderModule({ code: computeShader }),
			entryPoint: 'main',
        }
    });

    setRayTracingPass({
        bindGroup,
        pipeline
    });
}