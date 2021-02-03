open Js.Typed_array

let create = () => JobEntity.create("init_bmfr_postprocess_pass")

let _buildPrevNoisyBufferData = PassRTDoService.buildPixelBufferData

let _buildPrevPositionBufferData = PassRTDoService.buildPixelBufferData

let _buildPrevNormalBufferData = PassRTDoService.buildPixelBufferData

let _createAndSetBindGroup = (
  device,
  (
    (resolutionBuffer, resolutionBufferData),
    (pixelBuffer, pixelBufferSize),
    (bmfrDataBuffer, bmfrDataBufferSize),
    (commonBuffer, commonBufferData),
    (prevNoisyBuffer, prevNoisyBufferSize),
    (prevPositionBuffer, prevPositionBufferSize),
    (prevNormalBuffer, prevNormalBufferSize),
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
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=3,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=4,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="uniform-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=5,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=6,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.fragment,
          ~type_="uniform-buffer",
          (),
        ),
      ],
    },
    device,
  )

  BMFRPostprocessPassRTRepo.setStaticBindGroupData(
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
            ~buffer=prevNoisyBuffer,
            ~offset=0,
            ~size=prevNoisyBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=2,
            ~buffer=prevPositionBuffer,
            ~offset=0,
            ~size=prevPositionBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=3,
            ~buffer=prevNormalBuffer,
            ~offset=0,
            ~size=prevNormalBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=4,
            ~buffer=resolutionBuffer,
            ~offset=0,
            ~size=resolutionBufferData->PassRTDoService.getResolutionBufferDataSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=5,
            ~buffer=bmfrDataBuffer,
            ~offset=0,
            ~size=bmfrDataBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=6,
            ~buffer=commonBuffer,
            ~offset=0,
            // TODO extract BMFRPassRTDoService.getCommonBufferDataSize
            ~size=commonBufferData->Uint32Array.byteLength,
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
  let baseShaderPath = "src/run/rtx_real_time_hybrid_ray_tracer/domain_layer/domain/shader/bmfr/postprocess"

  let vertexShaderModule = WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
    {
      "code": WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(j`$(baseShaderPath)/postprocess.vert`),
    },
    device,
  )
  let fragmentShaderModule = WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
    {
      "code": WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(j`$(baseShaderPath)/postprocess.frag`),
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
  )->BMFRPostprocessPassRTRepo.setPipeline
}

let exec = () =>
  Tuple3.collectOption(
    WebGPURTRepo.getWindow(),
    WebGPURTRepo.getDevice(),
    WebGPURTRepo.getSwapChainFormat(),
  )
  ->Result.bind(((window, device, swapChainFormat)) => {
    let (prevNoisyBuffer, prevNoisyBufferSize) = _buildPrevNoisyBufferData(window, device)
    let (prevPositionBuffer, prevPositionBufferSize) = _buildPrevPositionBufferData(window, device)
    let (prevNormalBuffer, prevNormalBufferSize) = _buildPrevNormalBufferData(window, device)

    Tuple4.collectOption(
      PassRTRepo.getResolutionBufferData(),
      PassRTRepo.getPixelBufferData(),
      PassRTRepo.getBMFRDataBufferData(),
      BMFRRegressionPassRTRepo.getCommonBufferData(),
    )->Result.mapSuccess(((
      (resolutionBuffer, resolutionBufferData),
      (pixelBuffer, pixelBufferSize),
      (bmfrDataBuffer, bmfrDataBufferSize),
      (commonBuffer, commonBufferData),
    )) =>
      _createAndSetBindGroup(
        device,
        (
          (resolutionBuffer->UniformBufferVO.value, resolutionBufferData),
          (pixelBuffer->StorageBufferVO.value, pixelBufferSize),
          (bmfrDataBuffer->StorageBufferVO.value, bmfrDataBufferSize),
          (commonBuffer->UniformBufferVO.value, commonBufferData),
          (prevNoisyBuffer->StorageBufferVO.value, prevNoisyBufferSize),
          (prevPositionBuffer->StorageBufferVO.value, prevPositionBufferSize),
          (prevNormalBuffer->StorageBufferVO.value, prevNormalBufferSize),
        ),
      )->_createAndSetPipeline(device, swapChainFormat, _)
    )
  })
  ->WonderBsMost.Most.just
