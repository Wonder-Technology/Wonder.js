open Wonder_jest;

open Js.Promise;

open AllRenderConfigType;

let _ =
  describe(
    "test load worker data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test load job config json files",
        () => {
          let _buildFakeFetchForWorker = (sandbox) => {
            let fetch = createEmptyStubWithJsObjSandbox(sandbox);
            let (
              workerSetting,
              mainInitPipelines,
              mainLoopPipelines,
              workerPipelines,
              mainInitJobs,
              mainLoopJobs,
              workerJobs
            ) =
              WorkerJobConfigWorkerTool.buildWorkerJobConfig();
            fetch
            |> onCall(0)
            |> returns(
                 LoadDataTool.buildFakeFetchJsonResponse(
                   SettingTool.buildSetting(
                     "true",
                     None,
                     SettingTool.buildBufferConfigStr(),
                     {|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
                     "false",
                     "true"
                   )
                 )
               )
            |> onCall(1)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(workerSetting))
            |> onCall(2)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(mainInitPipelines))
            |> onCall(3)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(mainLoopPipelines))
            |> onCall(4)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(mainInitJobs))
            |> onCall(5)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(mainLoopJobs))
            |> onCall(6)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(workerPipelines))
            |> onCall(7)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(workerJobs));
            let (shaders, shaderLibs) = RenderConfigTool.buildRenderConfig();
            fetch
            |> onCall(8)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(shaders))
            |> onCall(9)
            |> returns(LoadDataTool.buildFakeFetchJsonResponse(shaderLibs));
            fetch
          };
          let _prepareLoadWorkerConfigData = () => {
            let fakeCanvas = {"transferControlToOffscreen": Obj.magic(1)};
            let createElementStub =
              Obj.magic(DomTool.documentToObj(DomExtend.document))##createElement |> Obj.magic;
            createElementStub |> withOneArg("canvas") |> returns(fakeCanvas) |> ignore
          };
          describe(
            "test create record with state",
            () =>
              describe(
                "test create transform record",
                () =>
                  testPromise(
                    "should create copiedBuffer",
                    () => {
                      open TransformType;
                      let fetchFunc = _buildFakeFetchForWorker(sandbox);
                      _prepareLoadWorkerConfigData();
                      LoadDataTool.load(~jsonPathArr=[||], ~fetchFunc, ())
                      |> then_(
                           () => {
                             let state = MainStateTool.unsafeGetState();
                             let {copiedBuffer} = TransformTool.getRecord(state);
                             copiedBuffer |> Js.Option.isSome |> expect == true |> resolve
                           }
                         )
                    }
                  )
              )
          )
        }
      )
    }
  );