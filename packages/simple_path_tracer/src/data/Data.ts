export let data = {
    canvas: null,

    config: {
        width: null,
        height: null,
        // isRender: true
    },
    scene: {
        camera: null,
        scene: null
    },
    webgpu: {
        device: null,
        adapter: null,
        context: null,
        format: null
    },
    camera: {
        cameraBufferData: null
    },
    pass: {
        frameIndex: null,
        commonDataBufferData: null,
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