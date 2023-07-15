import { getPass, setScreenPass, getWebGPU } from "../../../data/Repo";
import { fragmentShader, vertexShader } from "../../../shader/screen";

export let exec = () => {
    let { device, format } = getWebGPU();

    let bindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {
                    type: "storage"
                },
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {
                    type: "uniform"
                },
            },
            {
                binding: 2,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {
                    type: "uniform"
                },
            }
        ]
    });

    let { commonDataBufferData, pixelBufferData, resolutionBufferData } = getPass();
    let [commonDataBuffer, commonDataData] = commonDataBufferData;
    let [pixelBuffer, pixelBufferSize] = pixelBufferData;
    let [resolutionBuffer, resolutionData] = resolutionBufferData;

    let bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: pixelBuffer,
                    offset: 0,
                    size: pixelBufferSize
                }
            },
            {
                binding: 1,
                resource: {
                    buffer: resolutionBuffer,
                    offset: 0,
                    size: resolutionData.byteLength
                }
            },
            {
                binding: 2,
                resource: {
                    buffer: commonDataBuffer,
                    offset: 0,
                    size: commonDataData.byteLength
                }
            }
        ]
    });

    let pipeline = device.createRenderPipeline({
        layout: device.createPipelineLayout({
            bindGroupLayouts: [bindGroupLayout]
        }),
        vertex: {
            module: device.createShaderModule({
                code: vertexShader,
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({
                code: fragmentShader,
            }),
            entryPoint: "main",
            targets: [
                {
                    format
                },
            ],
        },
        primitive: {
            topology: 'triangle-list',
        },
    });

    setScreenPass({
        bindGroup,
        pipeline
    });
}