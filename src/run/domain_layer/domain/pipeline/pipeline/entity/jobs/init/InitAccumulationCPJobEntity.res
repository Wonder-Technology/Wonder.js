open Js.Typed_array

let create = () => JobEntity.create("init_accumulation")

let _buildAccumulationPixelBufferData = (window, device) => {
  let bufferSize =
    WebGPUCoreDpRunAPI.unsafeGet().window.getWidth(window) *
    WebGPUCoreDpRunAPI.unsafeGet().window.getHeight(window) *
    4 *
    Float32Array._BYTES_PER_ELEMENT

  let buffer = StorageBufferVO.createFromDevice(
    ~device,
    ~bufferSize,
    ~usage=lor(
      WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst,
      WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
    ),
    (),
  )

  (buffer, bufferSize)
}

let _createAndSetBindGroup = (
  device,
  (
    (resolutionBuffer, resolutionBufferData),
    (pixelBuffer, pixelBufferSize),
    (commonBuffer, commonBufferData),
    (accumulationPixelBuffer, accumulationPixelBufferSize),
  ),
) => {
  let bindGroupLayout = WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroupLayout(
    {
      "entries": [
        IWebGPUCoreDp.layoutBinding(
          ~binding=0,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=1,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=2,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="uniform-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=3,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="uniform-buffer",
          (),
        ),
      ],
    },
    device,
  )

  AccumulationPassCPRepo.setStaticBindGroupData(
    0,
    WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroup(
      {
        "layout": bindGroupLayout,
        "entries": [
          IWebGPUCoreDp.binding(
            ~binding=0,
            ~buffer=pixelBuffer,
            ~offset=0,
            ~size=pixelBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=1,
            ~buffer=accumulationPixelBuffer,
            ~offset=0,
            ~size=accumulationPixelBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=2,
            ~buffer=resolutionBuffer,
            ~offset=0,
            ~size=resolutionBufferData->PassCPDoService.getResolutionBufferDataSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=3,
            ~buffer=commonBuffer,
            ~offset=0,
            ~size=commonBufferData->PassCPDoService.getCommonBufferDataSize,
            (),
          ),
        ],
      },
      device,
    ),
  )

  bindGroupLayout
}

let _createAndSetPipeline = (device, swapChainFormat, bindGroupLayout) => {
  let baseShaderPath = "src/run/domain_layer/domain/shader/accumulation"

  let vertexShaderModule = WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
    {
      "code": WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(j`$(baseShaderPath)/accumulation.vert`),
    },
    device,
  )
  let fragmentShaderModule = WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
    {
      "code": WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(j`$(baseShaderPath)/accumulation.frag`),
    },
    device,
  )

  WebGPUCoreDpRunAPI.unsafeGet().device.createRenderPipeline(
    IWebGPUCoreDp.pipelineRenderDescriptor(
      ~layout=WebGPUCoreDpRunAPI.unsafeGet().device.createPipelineLayout(
        {"bindGroupLayouts": [bindGroupLayout]},
        device,
      ),
      ~vertexStage=IWebGPUCoreDp.vertexStage(~module_=vertexShaderModule, ~entryPoint="main"),
      ~fragmentStage=IWebGPUCoreDp.fragmentStage(~module_=fragmentShaderModule, ~entryPoint="main"),
      ~primitiveTopology="triangle-list",
      ~vertexState=IWebGPUCoreDp.vertexState(~indexFormat="uint32", ()),
      ~rasterizationState=IWebGPUCoreDp.rasterizationState(),
      ~colorStates=[
        IWebGPUCoreDp.colorState(
          ~format=swapChainFormat,
          ~alphaBlend=IWebGPUCoreDp.blendDescriptor(),
          ~colorBlend=IWebGPUCoreDp.blendDescriptor(),
        ),
      ],
      (),
    ),
    device,
  )->AccumulationPassCPRepo.setPipeline
}

let exec = () =>
  Tuple3.collectOption(
    WebGPUCPRepo.getWindow(),
    WebGPUCPRepo.getDevice(),
    WebGPUCPRepo.getSwapChainFormat(),
  )
  ->Result.bind(((window, device, swapChainFormat)) => {
    _buildAccumulationPixelBufferData(
      window,
      device,
    )->AccumulationPassCPRepo.setAccumulationPixelBufferData

    Tuple4.collectOption(
      PassCPRepo.getResolutionBufferData(),
      PassCPRepo.getPixelBufferData(),
      PassCPRepo.getCommonBufferData(),
      AccumulationPassCPRepo.getAccumulationPixelBufferData(),
    )->Result.mapSuccess(((
      (resolutionBuffer, resolutionBufferData),
      (pixelBuffer, pixelBufferSize),
      (commonBuffer, commonBufferData),
      (accumulationPixelBuffer, accumulationPixelBufferSize),
    ) as allBufferData) =>
      _createAndSetBindGroup(
        device,
        (
          (resolutionBuffer->UniformBufferVO.value, resolutionBufferData),
          (pixelBuffer->StorageBufferVO.value, pixelBufferSize),
          (commonBuffer->UniformBufferVO.value, commonBufferData),
          (accumulationPixelBuffer->StorageBufferVO.value, accumulationPixelBufferSize),
        ),
      )->_createAndSetPipeline(device, swapChainFormat, _)
    )
  })
  ->WonderBsMost.Most.just
