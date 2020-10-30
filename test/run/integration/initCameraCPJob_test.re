open Wonder_jest;

let _ =
  describe("test init_camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);

      device;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~initPipelineData={
          name: "init",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "init_camera", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build camera buffer data and set to po", () => {
      testPromise("create camera buffer", () => {
        let device = _prepare();
        let buffer = WebGPUDependencyTool.createBufferObject();
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(buffer)
          ->SinonTool.createTwoArgsEmptyStubData;
        let copy_dst = 0;
        let uniform = 1;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~copy_dst_bufferUsage=copy_dst,
          ~uniform,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (buffer, _) = CameraCPTool.getCameraBufferData();

              createBufferStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  {
                    "size":
                      (16 + 16 + 2)
                      * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
                    "usage": copy_dst lor uniform,
                  },
                  device,
                ));
            },
          (),
        );
      });
      testPromise("create type arr", () => {
        let device = _prepare();
        WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (_, typeArr) = CameraCPTool.getCameraBufferData();

              typeArr->expect
              == Js.Typed_array.Float32Array.fromLength(16 + 16 + 2);
            },
          (),
        );
      });
    });
  });
