import { getWebGPU, getPass, setPass, getConfig } from "../../../data/Repo"
import { createBuffer } from "../utils/Buffer"

let _buildPixelBufferData = (width, height, device) => {
    let bufferSize =
        width *
        height *
        4 *
        Float32Array.BYTES_PER_ELEMENT;

    let buffer = device.createBuffer({
        size: bufferSize,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
    });

    return [buffer, bufferSize];
}

let _buildResolutionBufferData = (width, height, device) => {
    let bufferData = new Float32Array([
        width,
        height
    ]);

    let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData];
}

let _buildCommonDataBufferData = device => {
    // let sampleCountPerPixel = 4;
    let sampleCountPerPixel = 1;
    let totalSampleCount = getPass().frameIndex + 1;

    let bufferData = new Uint32Array([
        sampleCountPerPixel,
        totalSampleCount,
        0,
        0
    ]);

    let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

    return [buffer, bufferData];
}

export let exec = () => {
    let { device } = getWebGPU();
    let { width, height } = getConfig()

    setPass({
        frameIndex: 0,
        commonDataBufferData: _buildCommonDataBufferData(device),
        pixelBufferData: _buildPixelBufferData(width, height, device),
        resolutionBufferData: _buildResolutionBufferData(width, height, device)
    });
}