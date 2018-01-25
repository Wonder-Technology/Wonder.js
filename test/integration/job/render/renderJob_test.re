open Wonder_jest;

open Js.Promise;

open RenderConfigType;

let _ =
  describe(
    "test render job",
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
        "test load job json files",
        () => {
          let _buildFakeFetchJsonResponse = (jsonStr) =>
            {"json": () => jsonStr |> Js.Json.parseExn |> Js.Promise.resolve} |> Js.Promise.resolve;
          let _buildFakeFetch = (sandbox) => {
            let fetch = createEmptyStubWithJsObjSandbox(sandbox);
            let (
              renderSetting,
              initPipelines,
              renderPipelines,
              initJobs,
              renderJobs,
              shaders,
              shaderLibs
            ) =
              RenderConfigTool.buildRenderConfig();
            fetch
            |> onCall(0)
            |> returns(_buildFakeFetchJsonResponse(renderSetting))
            |> onCall(1)
            |> returns(_buildFakeFetchJsonResponse(initPipelines))
            |> onCall(2)
            |> returns(_buildFakeFetchJsonResponse(renderPipelines))
            |> onCall(3)
            |> returns(_buildFakeFetchJsonResponse(initJobs))
            |> onCall(4)
            |> returns(_buildFakeFetchJsonResponse(renderJobs))
            |> onCall(5)
            |> returns(_buildFakeFetchJsonResponse(shaders))
            |> onCall(6)
            |> returns(_buildFakeFetchJsonResponse(shaderLibs));
            fetch
          };
          testPromise(
            "should dataDir for get json file path",
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
                           RenderConfigTool.getRenderSetting(state),
                           RenderConfigTool.getInitPipelines(state),
                           RenderConfigTool.getRenderPipelines(state),
                           RenderConfigTool.getInitJobs(state),
                           RenderConfigTool.getRenderJobs(state)
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
                                           {name: "init_basic_material", flags: None}
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
                                           {name: "render_basic", flags: None}
                                         |]
                                       }
                                     |],
                                     [|
                                       {name: "preget_glslData", shader: None},
                                       {name: "init_basic_material", shader: None}
                                     |],
                                     [|
                                       {name: "get_render_array", shader: None},
                                       {name: "get_camera_data", shader: None},
                                       {name: "clear_color", shader: None},
                                       {name: "clear_buffer", shader: None},
                                       {name: "render_basic", shader: None}
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
                         RenderConfigTool.getShaders(state)
                         |>
                         expect == {
                                     static_branchs: [|
                                       {
                                         name: "modelMatrix_instance",
                                         value: [|
                                           "modelMatrix_noInstance",
                                           "modelMatrix_hardware_instance",
                                           "modelMatrix_batch_instance"
                                         |]
                                       }
                                     |],
                                     groups: [|
                                       {name: "top", value: [|"common", "vertex"|]},
                                       {name: "end", value: [|"end"|]}
                                     |],
                                     basic_material: {
                                       material_shader: {
                                         shader_libs: [|
                                           {type_: Some("group"), name: "top"},
                                           {
                                             type_: Some("static_branch"),
                                             name: "modelMatrix_instance"
                                           },
                                           {type_: None, name: "basic"},
                                           {type_: None, name: "basic_end"},
                                           {type_: Some("group"), name: "end"}
                                         |]
                                       }
                                     }
                                   }
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
                         RenderConfigTool.getShaderLibs(state)[0]
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
              )
            }
          )
        }
      )
    }
  );