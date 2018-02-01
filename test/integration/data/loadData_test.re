open Wonder_jest;

open Js.Promise;

open RenderJobConfigType;

let _ =
  describe(
    "test load data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
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
          let _buildFakeFetchJsonResponse = (jsonStr) =>
            {"json": () => jsonStr |> Js.Json.parseExn |> Js.Promise.resolve} |> Js.Promise.resolve;
          let _buildFakeFetch = (sandbox) => {
            let fetch = createEmptyStubWithJsObjSandbox(sandbox);
            let (logicSetting, initPipelines, updatePipelines, initJobs, updateJobs) =
              LogicJobConfigTool.buildLogicJobConfig();
            fetch
            |> onCall(0)
            |> returns(_buildFakeFetchJsonResponse(logicSetting))
            |> onCall(1)
            |> returns(_buildFakeFetchJsonResponse(initPipelines))
            |> onCall(2)
            |> returns(_buildFakeFetchJsonResponse(updatePipelines))
            |> onCall(3)
            |> returns(_buildFakeFetchJsonResponse(initJobs))
            |> onCall(4)
            |> returns(_buildFakeFetchJsonResponse(updateJobs));
            let (
              renderSetting,
              initPipelines,
              renderPipelines,
              initJobs,
              renderJobs,
              shaders,
              shaderLibs
            ) =
              RenderJobConfigTool.buildRenderJobConfig();
            fetch
            |> onCall(5)
            |> returns(_buildFakeFetchJsonResponse(renderSetting))
            |> onCall(6)
            |> returns(_buildFakeFetchJsonResponse(initPipelines))
            |> onCall(7)
            |> returns(_buildFakeFetchJsonResponse(renderPipelines))
            |> onCall(8)
            |> returns(_buildFakeFetchJsonResponse(initJobs))
            |> onCall(9)
            |> returns(_buildFakeFetchJsonResponse(renderJobs))
            |> onCall(10)
            |> returns(_buildFakeFetchJsonResponse(shaders))
            |> onCall(11)
            |> returns(_buildFakeFetchJsonResponse(shaderLibs));
            fetch
          };
          describe(
            "test load logic config files",
            () => {
              testPromise(
                "should pass dataDir for get json file path",
                () => {
                  let fetch = _buildFakeFetch(sandbox);
                  state^
                  |> LoaderManagerSystem.load("../../.res/job/", fetch)
                  |> then_(
                       (state) =>
                         fetch
                         |> expect
                         |> toCalledWith([|"../../.res/job/logic/setting/logic_setting.json"|])
                         |> resolve
                     )
                }
              );
              describe(
                "parse job data and set to state",
                () => {
                  testPromise(
                    "test parse logic setting, init pipeline, logic pipeleint, init job, logic job",
                    () => {
                      let fetch = _buildFakeFetch(sandbox);
                      state^
                      |> LoaderManagerSystem.load("", fetch)
                      |> then_(
                           (state) =>
                             (
                               LogicJobConfigTool.getLogicSetting(state),
                               LogicJobConfigTool.getInitPipelines(state),
                               LogicJobConfigTool.getUpdatePipelines(state),
                               LogicJobConfigTool.getInitJobs(state),
                               LogicJobConfigTool.getUpdateJobs(state)
                             )
                             |>
                             expect == (
                                         {init_pipeline: "default", update_pipeline: "default"},
                                         [|
                                           {
                                             name: "default",
                                             jobs: [|
                                               {name: "init_cameraController"},
                                               {name: "init_geometry"},
                                               {name: "start_time"}
                                             |]
                                           }
                                         |],
                                         [|
                                           {
                                             name: "default",
                                             jobs: [|
                                               {name: "tick"},
                                               {name: "update_cameraController"}
                                             |]
                                           }
                                         |],
                                         [|
                                           {name: "init_cameraController"},
                                           {name: "init_geometry"},
                                           {name: "start_time"}
                                         |],
                                         [|{name: "tick"}, {name: "update_cameraController"}|]
                                       )
                             |> resolve
                         )
                    }
                  );
                  describe(
                    "fix bug",
                    () =>
                      testPromise(
                        "if the order of the fetch of logic json data change, shouldn't affect the setted data in state",
                        () => {
                          let fetch = _buildFakeFetch(sandbox);
                          let (logicSetting, initPipelines, updatePipelines, initJobs, updateJobs) =
                            LogicJobConfigTool.buildLogicJobConfig();
                          fetch
                          |> onCall(0)
                          |> SinonTool.deferReturns(
                               100.,
                               _buildFakeFetchJsonResponse(logicSetting)
                             );
                          state^
                          |> LoaderManagerSystem.load("", fetch)
                          |> then_(
                               (state) =>
                                 LogicJobConfigTool.getLogicSetting(state)
                                 |>
                                 expect == {init_pipeline: "default", update_pipeline: "default"}
                                 |> resolve
                             )
                        }
                      )
                  )
                }
              )
            }
          );
          describe(
            "test load render config files",
            () => {
              testPromise(
                "should pass dataDir for get json file path",
                () => {
                  let fetch = _buildFakeFetch(sandbox);
                  state^
                  |> LoaderManagerSystem.load("../../.res/job/", fetch)
                  |> then_(
                       (state) =>
                         fetch
                         |> expect
                         |> toCalledWith([|"../../.res/job/render/setting/render_setting.json"|])
                         |> resolve
                     )
                }
              );
              describe(
                "parse job data and set to state",
                () => {
                  testPromise(
                    "test parse render setting, init pipeline, render pipeleint, init job, render job",
                    () => {
                      let fetch = _buildFakeFetch(sandbox);
                      state^
                      |> LoaderManagerSystem.load("", fetch)
                      |> then_(
                           (state) =>
                             (
                               RenderJobConfigTool.getRenderSetting(state),
                               RenderJobConfigTool.getInitPipelines(state),
                               RenderJobConfigTool.getRenderPipelines(state),
                               RenderJobConfigTool.getInitJobs(state),
                               RenderJobConfigTool.getRenderJobs(state)
                             )
                             |>
                             expect == (
                                         {
                                           init_pipeline: "simple_basic_render",
                                           render_pipeline: "simple_basic_render"
                                         },
                                         [|
                                           {
                                             name: "simple_basic_render",
                                             jobs: [|
                                               {name: "preget_glslData", flags: None},
                                               {name: "init_basic_material", flags: None},
                                               {name: "init_light_material", flags: None}
                                             |]
                                           }
                                         |],
                                         [|
                                           {
                                             name: "simple_basic_render",
                                             jobs: [|
                                               {name: "get_render_array", flags: None},
                                               {name: "get_camera_data", flags: None},
                                               {name: "clear_color", flags: Some([|"#000000"|])},
                                               {
                                                 name: "clear_buffer",
                                                 flags:
                                                   Some([|
                                                     "COLOR_BUFFER",
                                                     "DEPTH_BUFFER",
                                                     "STENCIL_BUFFER"
                                                   |])
                                               },
                                               {name: "clear_last_send_component", flags: None},
                                               {name: "send_uniform_shader_data", flags: None},
                                               {name: "render_basic", flags: None},
                                               {name: "front_render_light", flags: None}
                                             |]
                                           }
                                         |],
                                         [|
                                           {name: "preget_glslData", shader: None},
                                           {name: "init_basic_material", shader: None},
                                           {name: "init_light_material", shader: None}
                                         |],
                                         [|
                                           {name: "get_render_array", shader: None},
                                           {name: "get_camera_data", shader: None},
                                           {name: "clear_color", shader: None},
                                           {name: "clear_buffer", shader: None},
                                           {name: "clear_last_send_component", shader: None},
                                           {name: "send_uniform_shader_data", shader: None},
                                           {name: "render_basic", shader: None},
                                           {name: "front_render_light", shader: None}
                                         |]
                                       )
                             |> resolve
                         )
                    }
                  );
                  testPromise(
                    "test parse shaders",
                    () => {
                      let fetch = _buildFakeFetch(sandbox);
                      state^
                      |> LoaderManagerSystem.load("", fetch)
                      |> then_(
                           (state) =>
                             RenderJobConfigTool.getShaders(state).static_branchs
                             |>
                             expect == [|
                                         {
                                           name: "modelMatrix_instance",
                                           value: [|
                                             "modelMatrix_noInstance",
                                             "modelMatrix_hardware_instance",
                                             "modelMatrix_batch_instance"
                                           |]
                                         }
                                       |]
                             |> resolve
                         )
                    }
                  );
                  testPromise(
                    "test parse shader libs",
                    () => {
                      let fetch = _buildFakeFetch(sandbox);
                      state^
                      |> LoaderManagerSystem.load("", fetch)
                      |> then_(
                           (state) =>
                             RenderJobConfigTool.getShaderLibs(state)[0]
                             |>
                             expect == {
                                         name: "common",
                                         glsls:
                                           Some([|
                                             {type_: "vs", name: "common_vertex"},
                                             {type_: "fs", name: "common_fragment"}
                                           |]),
                                         variables:
                                           Some({
                                             uniforms:
                                               Some([|
                                                 {
                                                   name: "u_vMatrix",
                                                   field: "vMatrix",
                                                   type_: "mat4",
                                                   from: "camera"
                                                 },
                                                 {
                                                   name: "u_pMatrix",
                                                   field: "pMatrix",
                                                   type_: "mat4",
                                                   from: "camera"
                                                 }
                                               |]),
                                             attributes: None
                                           })
                                       }
                             |> resolve
                         )
                    }
                  );
                  describe(
                    "fix bug",
                    () =>
                      testPromise(
                        "if the order of the fetch of render json data change, shouldn't affect the setted data in state",
                        () => {
                          let fetch = _buildFakeFetch(sandbox);
                          let (
                            renderSetting,
                            initPipelines,
                            renderPipelines,
                            initJobs,
                            renderJobs,
                            shaders,
                            shaderLibs
                          ) =
                            RenderJobConfigTool.buildRenderJobConfig();
                          fetch
                          |> onCall(5)
                          |> SinonTool.deferReturns(
                               100.,
                               _buildFakeFetchJsonResponse(renderSetting)
                             );
                          state^
                          |> LoaderManagerSystem.load("", fetch)
                          |> then_(
                               (state) =>
                                 RenderJobConfigTool.getRenderSetting(state)
                                 |>
                                 expect == {
                                             init_pipeline: "simple_basic_render",
                                             render_pipeline: "simple_basic_render"
                                           }
                                 |> resolve
                             )
                        }
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );