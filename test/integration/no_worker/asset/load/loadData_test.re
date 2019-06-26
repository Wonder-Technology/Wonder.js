open Wonder_jest;

open Js.Promise;

open AllRenderConfigType;

let _ =
  describe("test load no worker data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test load job config json files", () => {
      let _buildFakeFetchJsonResponse = jsonStr =>
        LoadDataTool.buildFakeFetchJsonResponse(jsonStr);

      let _buildFakeFetch = sandbox => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        let (
          noWorkerSetting,
          initPipelines,
          loopPipelines,
          initJobs,
          loopJobs,
        ) =
          NoWorkerJobConfigTool.buildNoWorkerJobConfig();
        fetch
        |> onCall(0)
        |> returns(
             _buildFakeFetchJsonResponse(
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
                 "false",
               ),
             ),
           )
        |> onCall(1)
        |> returns(_buildFakeFetchJsonResponse(noWorkerSetting))
        |> onCall(2)
        |> returns(_buildFakeFetchJsonResponse(initPipelines))
        |> onCall(3)
        |> returns(_buildFakeFetchJsonResponse(loopPipelines))
        |> onCall(4)
        |> returns(_buildFakeFetchJsonResponse(initJobs))
        |> onCall(5)
        |> returns(_buildFakeFetchJsonResponse(loopJobs));
        let (shaders, shaderLibs) = RenderConfigTool.buildRenderConfig();
        fetch
        |> onCall(6)
        |> returns(_buildFakeFetchJsonResponse(shaders))
        |> onCall(7)
        |> returns(_buildFakeFetchJsonResponse(shaderLibs));
        fetch;
      };
      describe("test load noWorker config files", () => {
        testPromise("should pass dataDir for get json file path", () => {
          let fetchFunc = _buildFakeFetch(sandbox);
          LoadDataTool.load(
            ~jsonPathArr=[|"../../.res/job/setting.json", "../../.res/job/"|],
            ~fetchFunc,
            (),
          )
          |> then_(() =>
               fetchFunc
               |> expect
               |> toCalledWith([|"../../.res/job/setting.json"|])
               |> resolve
             );
        });
        testPromise("should fetch shader_libs.json file", () => {
          let fetchFunc = _buildFakeFetch(sandbox);
          LoadDataTool.load(
            ~jsonPathArr=[|"../../.res/job/setting.json", "../../.res/job/"|],
            ~fetchFunc,
            (),
          )
          |> then_(() =>
               fetchFunc
               |> expect
               |> toCalledWith([|
                    "../../.res/job/render/shader/shader_libs.json",
                  |])
               |> resolve
             );
        });
        describe("parse job record and set to state", () =>
          testPromise(
            "test parse noWorker setting, init pipeline, noWorker pipeline, init job, noWorker job",
            () => {
              let fetchFunc = _buildFakeFetch(sandbox);
              LoadDataTool.load(~jsonPathArr=[||], ~fetchFunc, ())
              |> then_(() => {
                   let state = MainStateTool.unsafeGetState();
                   (
                     NoWorkerJobConfigTool.getSetting(state),
                     Array.unsafe_get(
                       NoWorkerJobConfigTool.getInitPipelines(state),
                       0,
                     ).
                       jobs
                     |> Js.Array.length
                     |> JudgeTool.isGreaterThan(_, 0),
                     Array.unsafe_get(
                       NoWorkerJobConfigTool.getLoopPipelines(state),
                       0,
                     ).
                       jobs
                     |> Js.Array.length
                     |> JudgeTool.isGreaterThan(_, 0),
                     NoWorkerJobConfigTool.getInitJobs(state)
                     |> Js.Array.length
                     |> JudgeTool.isGreaterThan(_, 0),
                     NoWorkerJobConfigTool.getLoopJobs(state)
                     |> Js.Array.length
                     |> JudgeTool.isGreaterThan(_, 0),
                   )
                   |> expect
                   == (
                        {initPipeline: "default", loopPipeline: "default"},
                        true,
                        true,
                        true,
                        true,
                      )
                   |> resolve;
                 });
            },
          )
        );
        testPromise("test parse shaders", () => {
          let fetchFunc = _buildFakeFetch(sandbox);
          LoadDataTool.load(~jsonPathArr=[||], ~fetchFunc, ())
          |> then_(() => {
               let state = MainStateTool.unsafeGetState();
               RenderConfigTool.getShaders(state).staticBranchs
               |> expect
               == [|
                    {
                      name: "modelMatrix_instance",
                      value: [|
                        "modelMatrix_noInstance",
                        "modelMatrix_hardware_instance",
                        "modelMatrix_batch_instance",
                      |],
                    },
                    {
                      name: "normalMatrix_instance",
                      value: [|
                        "normalMatrix_noInstance",
                        "normalMatrix_hardware_instance",
                        "normalMatrix_batch_instance",
                      |],
                    },
                  |]
               |> resolve;
             });
        });
        testPromise("test parse shader libs", () => {
          let fetchFunc = _buildFakeFetch(sandbox);
          LoadDataTool.load(~jsonPathArr=[||], ~fetchFunc, ())
          |> then_(() => {
               let state = MainStateTool.unsafeGetState();
               RenderConfigTool.getShaderLibs(state)[0]
               |> expect
               == {
                    name: "common",
                    glsls:
                      Some([|
                        {type_: "vs", name: "common_vertex"},
                        {type_: "fs", name: "common_fragment"},
                      |]),
                    variables:
                      Some({
                        uniforms:
                          Some([|
                            {
                              name: "u_vMatrix",
                              field: "vMatrix",
                              type_: "mat4",
                              from: "camera",
                            },
                            {
                              name: "u_pMatrix",
                              field: "pMatrix",
                              type_: "mat4",
                              from: "camera",
                            },
                          |]),
                        attributes: None,
                      }),
                  }
               |> resolve;
             });
        });
        describe("fix bug", () =>
          testPromise(
            "if the order of the fetch of noWorker json record change, shouldn't affect the setted record in state",
            () => {
              let fetchFunc = _buildFakeFetch(sandbox);
              let (
                noWorkerSetting,
                initPipelines,
                loopPipelines,
                initJobs,
                loopJobs,
              ) =
                NoWorkerJobConfigTool.buildNoWorkerJobConfig();
              fetchFunc
              |> onCall(1)
              |> SinonTool.deferReturns(
                   100.,
                   _buildFakeFetchJsonResponse(noWorkerSetting),
                 );
              LoadDataTool.load(~jsonPathArr=[||], ~fetchFunc, ())
              |> then_(() => {
                   let state = MainStateTool.unsafeGetState();
                   NoWorkerJobConfigTool.getSetting(state)
                   |> expect
                   == {initPipeline: "default", loopPipeline: "default"}
                   |> resolve;
                 });
            },
          )
        );
      });
    });
  });