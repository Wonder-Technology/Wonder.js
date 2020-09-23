open IWebGPUCoreDp;

open Sinon;

let createWindowObject = (): windowObject => Obj.magic(Js.Math.random());

let createAdapterObject = (): adapterObject => Obj.magic(Js.Math.random());

let createDeviceObject = (): deviceObject => Obj.magic(Js.Math.random());

let createContextObject = (): contextObject => Obj.magic(Js.Math.random());

let createQueueObject = (): queueObject => Obj.magic(Js.Math.random());

let createSwapChainObject = (): swapChainObject =>
  Obj.magic(Js.Math.random());

let createBufferObject = (): bufferObject => {
  Obj.magic(Js.Math.random());
};

let createBindGroupLayoutObject = (): bindGroupLayoutObject =>
  Obj.magic(Js.Math.random());

let createBindGroupObject = (): bindGroupObject =>
  Obj.magic(Js.Math.random());

let createPipelineLayout = (): pipelineLayoutObject =>
  Obj.magic(Js.Math.random());

let createRenderPipelineObject = (): renderPipelineObject =>
  Obj.magic(Js.Math.random());

let createComputePipelineObject = (): computePipelineObject =>
  Obj.magic(Js.Math.random());

let createShaderModuleObject = (): shaderModuleObject =>
  Obj.magic(Js.Math.random());

let createCommandEncoderObject = (): commandEncoderObject =>
  Obj.magic(Js.Math.random());

let createCommandBufferObject = (): commandBufferObject =>
  Obj.magic(Js.Math.random());

let createPassEncoderRenderObject = (): passEncoderRenderObject =>
  Obj.magic(Js.Math.random());

let createPassEncoderComputeObject = (): passEncoderComputeObject =>
  Obj.magic(Js.Math.random());

let createTextureViewObject = (): textureViewObject => {
  Obj.magic(Js.Math.random());
};

let build =
    (
      ~sandbox,
      ~copy_src_textureUsage=0,
      ~copy_dst_textureUsage=1,
      ~sampled=2,
      ~storage_textureUsage=3,
      ~output_attachment=4,
      ~compute=0,
      ~fragment=1,
      ~vertex=2,
      ~storage_bufferUsage=0,
      ~uniform=1,
      ~indirect=2,
      ~vertex=3,
      ~index=4,
      ~map_read=5,
      ~map_write=6,
      ~copy_src_bufferUsage=7,
      ~copy_dst_bufferUsage=8,
      ~createView=createEmptyStub(refJsObjToSandbox(sandbox^))
                  ->SinonTool.createTwoArgsEmptyStubData
                  ->SinonTool.getDpFunc,
      ~getCurrentTextureView=createEmptyStub(refJsObjToSandbox(sandbox^))
                             ->SinonTool.createTwoArgsEmptyStubData
                             ->SinonTool.getDpFunc,
      ~present=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~submit=createEmptyStub(refJsObjToSandbox(sandbox^))
              ->SinonTool.createTwoArgsEmptyStubData
              ->SinonTool.getDpFunc,
      ~setSubFloat32Data=createEmptyStub(refJsObjToSandbox(sandbox^))
                         ->SinonTool.createThreeArgsEmptyStubData
                         ->SinonTool.getDpFunc,
      ~setSubUint8Data=createEmptyStub(refJsObjToSandbox(sandbox^))
                       ->SinonTool.createThreeArgsEmptyStubData
                       ->SinonTool.getDpFunc,
      ~setSubUint32Data=createEmptyStub(refJsObjToSandbox(sandbox^))
                        ->SinonTool.createThreeArgsEmptyStubData
                        ->SinonTool.getDpFunc,
      ~setPipeline_render=createEmptyStub(refJsObjToSandbox(sandbox^))
                          ->SinonTool.createTwoArgsEmptyStubData
                          ->SinonTool.getDpFunc,
      ~setBindGroup_render=createEmptyStub(refJsObjToSandbox(sandbox^))
                           ->SinonTool.createThreeArgsEmptyStubData
                           ->SinonTool.getDpFunc,
      ~setDynamicBindGroup_render=createEmptyStub(
                                    refJsObjToSandbox(sandbox^),
                                  )
                                  ->SinonTool.createFourArgsEmptyStubData
                                  ->SinonTool.getDpFunc,
      ~setVertexBuffer=createEmptyStub(refJsObjToSandbox(sandbox^))
                       ->SinonTool.createThreeArgsEmptyStubData
                       ->SinonTool.getDpFunc,
      ~setIndexBuffer=createEmptyStub(refJsObjToSandbox(sandbox^))
                      ->SinonTool.createTwoArgsEmptyStubData
                      ->SinonTool.getDpFunc,
      ~draw=createEmptyStub(refJsObjToSandbox(sandbox^))
            ->SinonTool.createFiveArgsEmptyStubData
            ->SinonTool.getDpFunc,
      ~drawIndexed=createEmptyStub(refJsObjToSandbox(sandbox^))
                   ->SinonTool.createSixArgsEmptyStubData
                   ->SinonTool.getDpFunc,
      ~endPass_render=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~setPipeline_compute=createEmptyStub(refJsObjToSandbox(sandbox^))
                           ->SinonTool.createTwoArgsEmptyStubData
                           ->SinonTool.getDpFunc,
      ~setBindGroup_compute=createEmptyStub(refJsObjToSandbox(sandbox^))
                            ->SinonTool.createThreeArgsEmptyStubData
                            ->SinonTool.getDpFunc,
      ~setDynamicBindGroup_compute=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   )
                                   ->SinonTool.createFourArgsEmptyStubData
                                   ->SinonTool.getDpFunc,
      ~dispatchX=createEmptyStub(refJsObjToSandbox(sandbox^))
                 ->SinonTool.createTwoArgsEmptyStubData
                 ->SinonTool.getDpFunc,
      ~endPass_compute=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~beginRenderPass=createEmptyStub(refJsObjToSandbox(sandbox^))
                       ->SinonTool.createTwoArgsEmptyStubData
                       ->SinonTool.getDpFunc,
      ~beginComputePass=createEmptyStub(refJsObjToSandbox(sandbox^))
                        ->SinonTool.createTwoArgsEmptyStubData
                        ->SinonTool.getDpFunc,
      ~finish=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getQueue=createEmptyStub(refJsObjToSandbox(sandbox^))
                ->SinonTool.returns(createQueueObject()),
      ~createShaderModule=createEmptyStub(refJsObjToSandbox(sandbox^))
                          ->SinonTool.createTwoArgsEmptyStubData
                          ->SinonTool.getDpFunc,
      ~createPipelineLayout=createEmptyStub(refJsObjToSandbox(sandbox^))
                            ->SinonTool.createTwoArgsEmptyStubData
                            ->SinonTool.getDpFunc,
      ~createBuffer=createEmptyStub(refJsObjToSandbox(sandbox^))
                    ->SinonTool.returns(createBufferObject())
                    ->SinonTool.createTwoArgsEmptyStubData
                    ->SinonTool.getDpFunc,
      ~createBindGroupLayout=createEmptyStub(refJsObjToSandbox(sandbox^))
                             ->SinonTool.createTwoArgsEmptyStubData
                             ->SinonTool.getDpFunc,
      ~createBindGroup=createEmptyStub(refJsObjToSandbox(sandbox^))
                       ->SinonTool.createTwoArgsEmptyStubData
                       ->SinonTool.getDpFunc,
      ~createRenderPipeline=createEmptyStub(refJsObjToSandbox(sandbox^))
                            ->SinonTool.createTwoArgsEmptyStubData
                            ->SinonTool.getDpFunc,
      ~createComputePipeline=createEmptyStub(refJsObjToSandbox(sandbox^))
                             ->SinonTool.createTwoArgsEmptyStubData
                             ->SinonTool.getDpFunc,
      ~createCommandEncoder=createEmptyStub(refJsObjToSandbox(sandbox^))
                            ->SinonTool.createTwoArgsEmptyStubData
                            ->SinonTool.getDpFunc,
      ~createSampler=createEmptyStub(refJsObjToSandbox(sandbox^))
                     ->SinonTool.createTwoArgsEmptyStubData
                     ->SinonTool.getDpFunc,
      ~createTexture=createEmptyStub(refJsObjToSandbox(sandbox^))
                     ->SinonTool.createTwoArgsEmptyStubData
                     ->SinonTool.getDpFunc,
      ~getSwapChainPreferredFormat=createEmptyStub(
                                     refJsObjToSandbox(sandbox^),
                                   )
                                   ->SinonTool.returns(
                                       Js.Promise.make((~resolve, ~reject) =>
                                         resolve(. -1)
                                       ),
                                     )
                                   ->SinonTool.createTwoArgsEmptyStubData
                                   ->SinonTool.getDpFunc,
      ~configureSwapChain=createEmptyStub(refJsObjToSandbox(sandbox^))
                          ->SinonTool.returns(createSwapChainObject())
                          ->SinonTool.createTwoArgsEmptyStubData
                          ->SinonTool.getDpFunc,
      ~make=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getContext=createEmptyStub(refJsObjToSandbox(sandbox^))
                  ->SinonTool.returns(createContextObject()),
      ~pollEvents=createEmptyStub(refJsObjToSandbox(sandbox^))
                  ->SinonTool.createTwoArgsEmptyStubData
                  ->SinonTool.getDpFunc,
      ~shouldClose=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getWidth=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~getHeight=createEmptyStub(refJsObjToSandbox(sandbox^)),
      ~requestDevice=createEmptyStub(refJsObjToSandbox(sandbox^))
                     ->SinonTool.returns(
                         Js.Promise.make((~resolve, ~reject) =>
                           resolve(. createDeviceObject())
                         ),
                       )
                     ->SinonTool.createTwoArgsEmptyStubData
                     ->SinonTool.getDpFunc,
      ~requestAdapter=createEmptyStub(refJsObjToSandbox(sandbox^))
                      ->SinonTool.returns(
                          Js.Promise.make((~resolve, ~reject) =>
                            resolve(. createAdapterObject())
                          ),
                        ),
      ~loadGLSL=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    )
    : webgpuCore => {
  {
    textureUsage: {
      copy_src: copy_src_textureUsage,
      copy_dst: copy_dst_textureUsage,
      sampled,
      storage: storage_textureUsage,
      output_attachment,
    },
    texture: {
      createView: createView,
    },
    swapChain: {
      getCurrentTextureView,
      present,
    },
    queue: {
      submit: submit,
    },
    shaderStage: {
      compute,
      fragment,
      vertex,
    },
    bufferUsage: {
      storage: storage_bufferUsage,
      uniform,
      indirect,
      vertex,
      index,
      map_read,
      map_write,
      copy_src: copy_src_bufferUsage,
      copy_dst: copy_dst_bufferUsage,
    },
    buffer: {
      setSubFloat32Data,
      setSubUint8Data,
      setSubUint32Data,
    },
    passEncoder: {
      render: {
        setPipeline: setPipeline_render,
        setBindGroup: setBindGroup_render,
        setDynamicBindGroup: setDynamicBindGroup_render,
        setVertexBuffer,
        setIndexBuffer,
        draw,
        drawIndexed,
        endPass: endPass_render,
      },
      compute: {
        setPipeline: setPipeline_compute,
        setBindGroup: setBindGroup_compute,
        setDynamicBindGroup: setDynamicBindGroup_compute,
        dispatchX,
        endPass: endPass_compute,
      },
    },
    commandEncoder: {
      beginRenderPass,
      beginComputePass,
      finish,
    },
    device: {
      getQueue,
      createShaderModule,
      createPipelineLayout,
      createBuffer,
      createBindGroupLayout,
      createBindGroup,
      createRenderPipeline,
      createComputePipeline,
      createCommandEncoder,
      createSampler,
      createTexture,
    },
    context: {
      getSwapChainPreferredFormat,
      configureSwapChain,
    },
    window: {
      make,
      getContext,
      pollEvents,
      shouldClose,
      getWidth,
      getHeight,
    },
    adapter: {
      requestDevice: requestDevice,
    },
    gpu: {
      requestAdapter: requestAdapter,
    },
    loadGLSL,
  };
};

let set = dp => {
  WebGPUCoreDpCPAPI.set(dp);
};
