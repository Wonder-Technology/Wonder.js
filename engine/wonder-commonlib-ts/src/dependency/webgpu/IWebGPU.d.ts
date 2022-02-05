export type context = any

export type device = any

export type buffer = any

export type renderBundle = any

export type textureFormat = any

export type renderPipeline = any

export type textureUsageFlags = number

export type commandEncoder = any

export type adapter = {
    requestDevice: () => Promise<device>
}

export type requestAdapter = () => Promise<adapter>;

export type requestDevice = (adapter: adapter) => Promise<device>;

export type getRenderAttachmentType = () => textureUsageFlags;

type canvasConfiguration = {
    device: device,
    format: textureFormat,
    usage?: textureUsageFlags
}

export type configure = (context: context, canvasConfiguration: canvasConfiguration) => void;

export type createCommandEncoder = (device: device) => commandEncoder;

export type textureView = any

type loadValue = {
    r: number,
    g: number,
    b: number,
    a: number
}

type storeOp = "store" | "discard"


type renderPassColorAttachment = {
    view: textureView,
    loadValue: loadValue,
    storeOp: storeOp
}

export type renderPassDescriptor = {
    colorAttachments: Array<renderPassColorAttachment>
}

export type renderPassEncoder = any

export type beginRenderPass = (commandEncoder: commandEncoder, renderPassDescriptor: renderPassDescriptor) => renderPassEncoder;

export type getCurrentTexture = (context: context) => textureView

export type setViewport = (renderPassEncoder: renderPassEncoder, width: number, height: number, minDepth: number, maxDepth: number) => void

export type executeBundles = (renderPassEncoder: renderPassEncoder, bundles: Array<renderBundle>) => void

export type endPass = (renderPassEncoder: renderPassEncoder) => void

export type commandBuffer = any

export type finish = (commandEncoder: commandEncoder) => commandBuffer

export type submit = (device: device, commandBuffers: Array<commandBuffer>) => void


export type webgpu = {
    requestAdapter: requestAdapter,
    requestDevice: requestDevice
    // getRenderAttachmentType: getRenderAttachmentType,
    // configure: configure,
    // createCommandEncoder: createCommandEncoder,
    // beginRenderPass: beginRenderPass,
    // getCurrentTexture: getCurrentTexture,
    // setViewport: setViewport,
    // executeBundles: executeBundles,
    // endPass: endPass,
    // submit: submit,
    // finish: finish,
}
