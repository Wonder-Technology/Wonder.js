open Wonder_jest;

let _ =
  describe("test update_pass_for_render job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

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
              elements: [{name: "update_pass_for_render", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update common buffer data", () => {
      let _prepare = () => {
        let device = WebGPUDependencyTool.createDeviceObject();
        WebGPUCPTool.setDevice(device);
        let window = WebGPUDependencyTool.createWindowObject();
        WebGPUCPTool.setWindow(window);

        PassCPTool.buildAndSetAllBufferData(window, device);
      };

      testPromise("set total sample count to buffer data", () => {
        let _ = _prepare();
        DirectorCPTool.prepare();
        let totalSampleCount = 10;
        PassCPTool.setTotalSampleCount(totalSampleCount);

        DirectorCPTool.initAndRender(
          ~handleSuccessFunc=
            () => {
              let (_, typeArr) = PassCPTool.getCommonBufferData();

              typeArr->Js.Typed_array.Uint32Array.unsafe_get(1)->expect
              == totalSampleCount;
            },
          (),
        );
      });
      testPromise("set buffer's data", () => {
        let _ = _prepare();
        let setSubUint32DataStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.createThreeArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~setSubUint32Data=setSubUint32DataStubData->SinonTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.initAndRender(
          ~handleSuccessFunc=
            () => {
              let (buffer, typeArr) = PassCPTool.getCommonBufferData();

              setSubUint32DataStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  0,
                  typeArr,
                  buffer->UniformBufferVO.value,
                ));
            },
          (),
        );
      });
    });
  });
