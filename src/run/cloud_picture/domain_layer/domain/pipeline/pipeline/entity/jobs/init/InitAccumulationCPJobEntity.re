open Js.Typed_array;

let create = () => JobEntity.create("init_accumulation");

let _buildAccumulationPixelBufferData = (window, device) => {
  let bufferSize =
    DpContainer.unsafeGetWebGPUCoreDp().window.getWidth(window)
    * DpContainer.unsafeGetWebGPUCoreDp().window.getHeight(window)
    * 4
    * Float32Array._BYTES_PER_ELEMENT;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize);
};

let _createAndSetBindGroup =
    (
      device,
      (
        (resolutionBuffer, resolutionBufferData),
        (pixelBuffer, pixelBufferSize),
        (accumulationPixelBuffer, accumulationPixelBufferSize),
      ),
    ) => {
  let bindGroupLayout =
    DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroupLayout(
      {
        "entries": [|
          IWebGPUCoreDp.layoutBinding(
            ~binding=0,
            ~visibility=
              DpContainer.unsafeGetWebGPUCoreDp().shaderStage.fragment,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=1,
            ~visibility=
              DpContainer.unsafeGetWebGPUCoreDp().shaderStage.fragment,
            ~type_="storage-buffer",
            (),
          ),
          IWebGPUCoreDp.layoutBinding(
            ~binding=2,
            ~visibility=
              DpContainer.unsafeGetWebGPUCoreDp().shaderStage.fragment,
            ~type_="uniform-buffer",
            (),
          ),
        |],
      },
      device,
    );

  AccumulationPassCPRepo.setStaticBindGroupData(
    0,
    DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroup(
      {
        "layout": bindGroupLayout,
        "entries": [|
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
            ~size=
              resolutionBufferData->PassCPDoService.getResolutionBufferDataSize,
            (),
          ),
        |],
      },
      device,
    ),
  );

  bindGroupLayout;
};

let _createAndSetPipeline = (device, swapChainFormat, bindGroupLayout) => {
  let baseShaderPath = "src/run/cloud_picture/domain_layer/domain/pipeline/shader/accumulation";

  let vertexShaderModule =
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/accumulation.vert|j},
          ),
      },
      device,
    );
  let fragmentShaderModule =
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/accumulation.frag|j},
          ),
      },
      device,
    );

  DpContainer.unsafeGetWebGPUCoreDp().device.createRenderPipeline(
    IWebGPUCoreDp.pipelineRenderDescriptor(
      ~layout=
        DpContainer.unsafeGetWebGPUCoreDp().device.createPipelineLayout(
          {"bindGroupLayouts": [|bindGroupLayout|]},
          device,
        ),
      ~vertexStage={
        IWebGPUCoreDp.vertexStage(
          ~module_=vertexShaderModule,
          ~entryPoint="main",
        );
      },
      ~fragmentStage={
        IWebGPUCoreDp.fragmentStage(
          ~module_=fragmentShaderModule,
          ~entryPoint="main",
        );
      },
      ~primitiveTopology="triangle-list",
      ~vertexState=IWebGPUCoreDp.vertexState(~indexFormat="uint32", ()),
      ~rasterizationState=IWebGPUCoreDp.rasterizationState(),
      ~colorStates=[|
        IWebGPUCoreDp.colorState(
          ~format=swapChainFormat,
          ~alphaBlend=IWebGPUCoreDp.blendDescriptor(),
          ~colorBlend=IWebGPUCoreDp.blendDescriptor(),
        ),
      |],
      (),
    ),
    device,
  )
  ->AccumulationPassCPRepo.setPipeline;
};

let exec = () => {
  Tuple3.collectOption(
    WebGPUCPRepo.getWindow(),
    WebGPUCPRepo.getDevice(),
    WebGPUCPRepo.getSwapChainFormat(),
  )
  ->Result.bind(((window, device, swapChainFormat)) => {
      _buildAccumulationPixelBufferData(window, device)
      ->AccumulationPassCPRepo.setAccumulationPixelBufferData;

      Tuple3.collectOption(
        PassCPRepo.getResolutionBufferData(),
        PassCPRepo.getPixelBufferData(),
        AccumulationPassCPRepo.getAccumulationPixelBufferData(),
      )
      ->Result.mapSuccess(
          (
            (
              (resolutionBuffer, resolutionBufferData),
              (pixelBuffer, pixelBufferSize),
              (accumulationPixelBuffer, accumulationPixelBufferSize),
            ) as allBufferData,
          ) => {
          _createAndSetBindGroup(
            device,
            (
              (resolutionBuffer->UniformBufferVO.value, resolutionBufferData),
              (pixelBuffer->StorageBufferVO.value, pixelBufferSize),
              (
                accumulationPixelBuffer->StorageBufferVO.value,
                accumulationPixelBufferSize,
              ),
            ),
          )
          ->_createAndSetPipeline(device, swapChainFormat, _)
        });
    })
  ->WonderBsMost.Most.just;
};
