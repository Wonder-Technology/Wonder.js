open Wonder_jest;

let _ =
  describe("test render_pathTracing job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let window = WebGPUDependencyTool.createWindowObject();
      WebGPUCPTool.setWindow(window);
      let queue = WebGPUDependencyTool.createQueueObject();
      WebGPUCPTool.setQueue(queue);

      PathTracingPassCPTool.createAndSetPipeline();
      PathTracingPassCPTool.createAndSetAllBindGroups();

      (device, window, queue);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~renderPipelineData={
          name: "render",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "render_pathTracing", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("begin ray tracing pass", () => {
      let (device, window, queue) = _prepare();
      let commandEncoder = WebGPUDependencyTool.createCommandEncoderObject();
      let createCommandEncoderStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(commandEncoder)
        ->SinonTool.createTwoArgsEmptyStubData;
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~createCommandEncoder=
          createCommandEncoderStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              createCommandEncoderStubData
              ->SinonTool.getStub
              ->SinonTool.calledWithArg2(
                  IWebGPUCoreDp.commandEncoderDescriptor(),
                  device,
                ),
              beginRayTracingPassStubData
              ->SinonTool.getStub
              ->SinonTool.calledWithArg2(
                  IWebGPURayTracingDp.passEncoderRayTracingDescriptor(),
                  commandEncoder,
                ),
            )
            ->expect
            == (true, true)
          },
        (),
      );
    });
    testPromise("set pipeline", () => {
      let (device, window, queue) = _prepare();
      let setPipelineStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.createTwoArgsEmptyStubData;
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(pass)
        ->SinonTool.createTwoArgsEmptyStubData;

      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonTool.getDpFunc,
        ~setPipeline=setPipelineStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            let pipeline = PathTracingPassCPTool.getPipeline();

            setPipelineStubData
            ->SinonTool.getStub
            ->SinonTool.calledWithArg2(pipeline, pass)
            ->expect
            == true;
          },
        (),
      );
    });
    testPromise("set all bind groups", () => {
      let (device, window, queue) = _prepare();
      let setBindGroupStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.createThreeArgsEmptyStubData;
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(pass)
        ->SinonTool.createTwoArgsEmptyStubData;

      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonTool.getDpFunc,
        ~setBindGroup=setBindGroupStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            let [bindGroupData1, bindGroupData2, bindGroupData3] =
              PathTracingPassCPTool.getAllStaticBindGroupData();

            (
              setBindGroupStubData
              ->SinonTool.getStub
              ->getCall(0, _)
              ->SinonTool.calledWithArg3(
                  bindGroupData1.setSlot,
                  bindGroupData1.bindGroup,
                  pass,
                ),
              setBindGroupStubData
              ->SinonTool.getStub
              ->getCall(1, _)
              ->SinonTool.calledWithArg3(
                  bindGroupData2.setSlot,
                  bindGroupData2.bindGroup,
                  pass,
                ),
              setBindGroupStubData
              ->SinonTool.getStub
              ->getCall(2, _)
              ->SinonTool.calledWithArg3(
                  bindGroupData3.setSlot,
                  bindGroupData3.bindGroup,
                  pass,
                ),
            )
            ->expect
            == (true, true, true);
          },
        (),
      );
    });
    testPromise("trace rays", () => {
      let (device, window, queue) = _prepare();
      let traceRaysStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.createSevenArgsEmptyStubData;
      let width = 10;
      let height = 20;
      let getWidth =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(width);
      let getHeight =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(height);
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(pass)
        ->SinonTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(~sandbox, ~getWidth, ~getHeight, ())
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~traceRays=traceRaysStubData->SinonTool.getDpFunc,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            traceRaysStubData
            ->SinonTool.getStub
            ->expect
            ->SinonTool.toCalledWith((0, 1, 2, width, height, 1, pass))
          },
        (),
      );
    });
    testPromise("end pass and finish and submit", () => {
      let (device, window, queue) = _prepare();
      let endPass = createEmptyStub(refJsObjToSandbox(sandbox^));
      let commandBufferObject =
        WebGPUDependencyTool.createCommandBufferObject();
      let finish = createEmptyStub(refJsObjToSandbox(sandbox^));
      finish->onCall(0, _)->SinonTool.returns(commandBufferObject);
      let submitStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.createTwoArgsEmptyStubData;

      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonTool.returns(pass)
        ->SinonTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~finish,
        ~submit=submitStubData->SinonTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonTool.getDpFunc,
        ~endPass,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              endPass->SinonTool.calledWith(pass),
              submitStubData
              ->SinonTool.getStub
              ->SinonTool.calledWithArg2([|commandBufferObject|], queue),
            )
            ->expect
            == (true, true)
          },
        (),
      );
    });
  });
