open Js.Typed_array

let create = () => JobEntity.create("init_bmfr_regression_pass")

let _getBlockPixels = () => 1024

let _buildBufferData = (window, device) => {
  let blockPixels = _getBlockPixels()

  let w = BMFRRegressPassRTDoService.computeHorizentalBlocksCount(window)
  let h = BMFRRegressPassRTDoService.computeVerticalBlocksCount(window)

  let bufferSize = blockPixels * w * h * 13 * Float32Array._BYTES_PER_ELEMENT
  let buffer = StorageBufferVO.createFromDevice(
    ~device,
    ~bufferSize,
    // ~usage=lor(
    //   WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst,
    //   WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
    // ),
    (),
  )

  (buffer, bufferSize)
}

let _buildCommonDataBuffer = (window, device) => {
  let bufferData = Uint32Array.make([
    0,
    BMFRRegressPassRTDoService.computeHorizentalBlocksCount(window),
  ])

  let bufferSize = bufferData->Uint32Array.byteLength

  let buffer = UniformBufferVO.createFromDevice(~device, ~bufferSize)

  WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
    0,
    bufferData,
    buffer->UniformBufferVO.value,
  )

  (buffer, bufferData)
}

let _createAndSetBindGroup = (
  device,
  (
    (resolutionBuffer, resolutionBufferData),
    (pixelBuffer, pixelBufferSize),
    (bmfrDataBuffer, bmfrDataBufferSize),
    (commonBuffer, commonBufferData),
    (tmdBuffer, tmdBufferSize),
    (outBuffer, outBufferSize),
  ),
) => {
  let bindGroupLayout = WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroupLayout(
    {
      "entries": [
        IWebGPUCoreDp.layoutBinding(
          ~binding=0,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=1,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=2,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=3,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="uniform-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=4,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="storage-buffer",
          (),
        ),
        IWebGPUCoreDp.layoutBinding(
          ~binding=5,
          ~visibility=WebGPUCoreDpRunAPI.unsafeGet().shaderStage.compute,
          ~type_="uniform-buffer",
          (),
        ),
      ],
    },
    device,
  )

  BMFRRegressionPassRTRepo.setStaticBindGroupData(
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
          IWebGPUCoreDp.binding(~binding=1, ~buffer=tmdBuffer, ~offset=0, ~size=tmdBufferSize, ()),
          IWebGPUCoreDp.binding(~binding=2, ~buffer=outBuffer, ~offset=0, ~size=outBufferSize, ()),
          IWebGPUCoreDp.binding(
            ~binding=3,
            ~buffer=resolutionBuffer,
            ~offset=0,
            ~size=resolutionBufferData->PassRTDoService.getResolutionBufferDataSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=4,
            ~buffer=bmfrDataBuffer,
            ~offset=0,
            ~size=bmfrDataBufferSize,
            (),
          ),
          IWebGPUCoreDp.binding(
            ~binding=5,
            ~buffer=commonBuffer,
            ~offset=0,
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

let _createAndSetPipeline = (device, bindGroupLayout) => {
  let baseShaderPath = "src/run/rtx_real_time_hybrid_ray_tracer/domain_layer/domain/shader/bmfr"

  let computeShaderModule = WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
    {
      "code": WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(j`$(baseShaderPath)/regression.comp`),
    },
    device,
  )

  WebGPUCoreDpRunAPI.unsafeGet().device.createComputePipeline(
    IWebGPUCoreDp.pipelineComputeDescriptor(
      ~layout=WebGPUCoreDpRunAPI.unsafeGet().device.createPipelineLayout(
        {"bindGroupLayouts": [bindGroupLayout]},
        device,
      ),
      ~computeStage={
        IWebGPUCoreDp.computeStage(~module_=computeShaderModule, ~entryPoint="main")
      },
    ),
    device,
  )->BMFRRegressionPassRTRepo.setPipeline
}

let exec = () =>
  Tuple2.collectOption(WebGPURTRepo.getWindow(), WebGPURTRepo.getDevice())->Result.bind(((
    window,
    device,
  )) => {
    // _buildBufferData(window, device)->BMFRRegressionPassRTRepo.setTmdBufferData
    // _buildBufferData(window, device)->BMFRRegressionPassRTRepo.setOutBufferData
    _buildCommonDataBuffer(window, device)->BMFRRegressionPassRTRepo.setCommonBufferData

    let (tmdBuffer, tmdBufferSize) = _buildBufferData(window, device)
    let (outBuffer, outBufferSize) = _buildBufferData(window, device)

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
          (tmdBuffer->StorageBufferVO.value, tmdBufferSize),
          (outBuffer->StorageBufferVO.value, outBufferSize),
        ),
      )->_createAndSetPipeline(device, _)
    )
  })->WonderBsMost.Most.just
