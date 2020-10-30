open Wonder_jest;

let _ =
  describe("test init_pass job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject();
      WebGPUCPTool.setDevice(device);
      let window = WebGPUDependencyTool.createWindowObject();
      WebGPUCPTool.setWindow(window);

      (window, device);
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
              elements: [{name: "init_pass", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("build pixel buffer data and set to po", () => {
      testPromise("create pixel buffer", () => {
        let (window, device) = _prepare();
        let width = 10;
        let height = 20;
        let getWidth =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(width);
        let getHeight =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(height);
        let buffer = WebGPUDependencyTool.createBufferObject();
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(buffer)
          ->SinonTool.createTwoArgsEmptyStubData;
        let storage = 3;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~storage_bufferUsage=storage,
          ~getWidth,
          ~getHeight,
          (),
        )
        ->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (buffer, bufferSize) = PassCPTool.getPixelBufferData();

              (
                bufferSize,
                createBufferStubData
                ->SinonTool.getStub
                ->getCall(0, _)
                ->SinonTool.calledWithArg2(
                    {"size": bufferSize, "usage": storage},
                    device,
                  ),
              )
              ->expect
              == (
                   width
                   * height
                   * 4
                   * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
                   true,
                 );
            },
          (),
        );
      })
    });

    describe("build common buffer data and set to po", () => {
      testPromise("create common buffer", () => {
        let (window, device) = _prepare();
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
              let (buffer, _) = PassCPTool.getCommonBufferData();

              createBufferStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((
                  {
                    "size": 2 * Js.Typed_array.Uint32Array._BYTES_PER_ELEMENT,
                    "usage": copy_dst lor uniform,
                  },
                  device,
                ));
            },
          (),
        );
      });
      testPromise("create type arr", () => {
        let _ = _prepare();
        WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (_, typeArr) = PassCPTool.getCommonBufferData();

              typeArr->expect == Js.Typed_array.Uint32Array.fromLength(2);
            },
          (),
        );
      });
    });

    describe("build resolution buffer data and set to po", () => {
      let _prepare = sandbox => {
        let (window, device) = _prepare();
        let width = 10;
        let height = 20;
        let getWidth =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(width);
        let getHeight =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(height);
        let buffer = WebGPUDependencyTool.createBufferObject();
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.returns(buffer)
          ->SinonTool.createTwoArgsEmptyStubData;
        let copy_dst = 0;
        let uniform = 1;
        let setSubFloat32DataStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonTool.createThreeArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
          ~copy_dst_bufferUsage=copy_dst,
          ~uniform,
          ~getWidth,
          ~getHeight,
          (),
        )
        ->WebGPUDependencyTool.set;

        (
          (width, height),
          (copy_dst, uniform),
          (window, device, buffer),
          (
            getWidth,
            getHeight,
            createBufferStubData,
            setSubFloat32DataStubData,
          ),
        );
      };

      testPromise("create resolution buffer", () => {
        let (
          (width, height),
          (copy_dst, uniform),
          (window, device, buffer),
          (
            getWidth,
            getHeight,
            createBufferStubData,
            setSubFloat32DataStubData,
          ),
        ) =
          _prepare(sandbox);

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (buffer, _) = PassCPTool.getResolutionBufferData();

              createBufferStubData
              ->SinonTool.getStub
              ->getCall(2, _)
              ->expect
              ->SinonTool.toCalledWith((
                  {
                    "size": 2 * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT,
                    "usage": copy_dst lor uniform,
                  },
                  device,
                ));
            },
          (),
        );
      });
      testPromise("create type arr and set it's data", () => {
        let (
          (width, height),
          (copy_dst, uniform),
          (window, device, buffer),
          (
            getWidth,
            getHeight,
            createBufferStubData,
            setSubFloat32DataStubData,
          ),
        ) =
          _prepare(sandbox);

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (_, typeArr) = PassCPTool.getResolutionBufferData();

              typeArr->expect
              == Js.Typed_array.Float32Array.make([|
                   width->Belt.Float.fromInt,
                   height->Belt.Float.fromInt,
                 |]);
            },
          (),
        );
      });
      testPromise("set resolution buffer's data", () => {
        let (
          (width, height),
          (copy_dst, uniform),
          (window, device, buffer),
          (
            getWidth,
            getHeight,
            createBufferStubData,
            setSubFloat32DataStubData,
          ),
        ) =
          _prepare(sandbox);

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              let (_, typeArr) = PassCPTool.getResolutionBufferData();

              setSubFloat32DataStubData
              ->SinonTool.getStub
              ->expect
              ->SinonTool.toCalledWith((0, typeArr, buffer));
            },
          (),
        );
      });
    });
  });
