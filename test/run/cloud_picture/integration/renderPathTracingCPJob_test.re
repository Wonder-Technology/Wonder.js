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
        ->SinonCPTool.returns(commandEncoder)
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~createCommandEncoder=
          createCommandEncoderStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              createCommandEncoderStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2(
                  IWebGPUCoreDp.commandEncoderDescriptor(),
                  device,
                ),
              beginRayTracingPassStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2(
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
        ->SinonCPTool.createTwoArgsEmptyStubData;
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonCPTool.getDpFunc,
        ~setPipeline=setPipelineStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            let pipeline = PathTracingPassCPTool.getPipeline();

            setPipelineStubData
            ->SinonCPTool.getStub
            ->SinonCPTool.calledWithArg2(pipeline, pass)
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
        ->SinonCPTool.createThreeArgsEmptyStubData;
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonCPTool.getDpFunc,
        ~setBindGroup=setBindGroupStubData->SinonCPTool.getDpFunc,
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
              ->SinonCPTool.getStub
              ->getCall(0, _)
              ->SinonCPTool.calledWithArg3(
                  bindGroupData1.setSlot,
                  bindGroupData1.bindGroup,
                  pass,
                ),
              setBindGroupStubData
              ->SinonCPTool.getStub
              ->getCall(1, _)
              ->SinonCPTool.calledWithArg3(
                  bindGroupData2.setSlot,
                  bindGroupData2.bindGroup,
                  pass,
                ),
              setBindGroupStubData
              ->SinonCPTool.getStub
              ->getCall(2, _)
              ->SinonCPTool.calledWithArg3(
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
        ->SinonCPTool.createSevenArgsEmptyStubData;
      let width = 10;
      let height = 20;
      let getWidth =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(width);
      let getHeight =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(height);
      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(~sandbox, ~getWidth, ~getHeight, ())
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~traceRays=traceRaysStubData->SinonCPTool.getDpFunc,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            traceRaysStubData
            ->SinonCPTool.getStub
            ->expect
            ->SinonCPTool.toCalledWith((0, 1, 2, width, height, 1, pass))
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
      finish->onCall(0, _)->SinonCPTool.returns(commandBufferObject);
      let submitStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.createTwoArgsEmptyStubData;

      let pass =
        WebGPURayTracingDependencyTool.createPassEncoderRayTracingObject();
      let beginRayTracingPassStubData =
        createEmptyStub(refJsObjToSandbox(sandbox^))
        ->SinonCPTool.returns(pass)
        ->SinonCPTool.createTwoArgsEmptyStubData;

      WebGPUDependencyTool.build(
        ~sandbox,
        ~finish,
        ~submit=submitStubData->SinonCPTool.getDpFunc,
        (),
      )
      ->WebGPUDependencyTool.set;
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~beginRayTracingPass=
          beginRayTracingPassStubData->SinonCPTool.getDpFunc,
        ~endPass,
        (),
      )
      ->WebGPURayTracingDependencyTool.set;

      DirectorCPTool.initAndRender(
        ~handleSuccessFunc=
          () => {
            (
              endPass->SinonCPTool.calledWith(pass),
              submitStubData
              ->SinonCPTool.getStub
              ->SinonCPTool.calledWithArg2([|commandBufferObject|], queue),
            )
            ->expect
            == (true, true)
          },
        (),
      );
    });
  });
