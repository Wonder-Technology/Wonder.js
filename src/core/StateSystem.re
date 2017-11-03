open StateDataType;

let getState = (stateData: stateData) : state => Js.Option.getExn(stateData.state);

let setState = (~stateData: stateData, state: state) => {
  stateData.state = Some(state);
  state
};

/* todo move out */
/* todo set more settings */
let convertRenderSettingToRecord = (render_setting) => {
  open Json;
  open Decode;
  let json = render_setting |> Js.Json.parseExn;
  {
    platform: json |> field("platform", string),
    backend:
      json
      |> field(
           "backend",
           (json) => {
             name: json |> field("name", string),
             fail: json |> optional(field("fail", string))
           }
         ),
    browser:
      json
      |> field(
           "browser",
           (json) =>
             json
             |> array(
                  (json) => {
                    name: json |> field("name", string),
                    version: json |> field("version", string)
                  }
                )
         ),
    init_pipeline: json |> field("init_pipeline", string),
    render_pipeline: json |> field("render_pipeline", string)
  }
};

let convertInitPipelinesToRecord = (init_pipelines) =>
  Render_setting.(
    Json.(
      Decode.(
        init_pipelines
        |> Js.Json.parseExn
        |> array(
             (json) => {
               name: json |> field("name", string),
               jobs: json |> field("jobs", array((json) => {name: json |> field("name", string)}))
             }
           )
      )
    )
  );

let convertInitJobsToRecord = (init_jobs) =>
  Render_setting.(
    Json.(
      Decode.(
        init_jobs |> Js.Json.parseExn |> array((json) => {name: json |> field("name", string)})
      )
    )
  );

let convertShadersToRecord = (shaders) => {
  open Json;
  open Decode;
  let json = shaders |> Js.Json.parseExn;
  {
    groups:
      json
      |> field(
           "groups",
           (json) =>
             json
             |> array(
                  (json) => {name: json |> field("name", string), value: json |> array(string)}
                )
         ),
    basic_material:
      json
      |> field(
           "init_basic_material",
           (json) =>
             json
             |> array(
                  (json) => {
                    name: json |> field("name", string),
                    shader_libs:
                      json
                      |> array(
                           fun (json) => (
                             {
                               type_: json |> optional(field("type", string)),
                               name: json |> field("name", string)
                             }: shaderLibItem
                           )
                         )
                  }
                )
         )
  }
};

let convertShaderLibsToRecord = (shader_libs) =>
  Json.(
    Decode.(
      shader_libs
      |> Js.Json.parseExn
      |> array(
           (json) => {
             name: json |> field("name", string),
             glsls:
               json
               |> optional(
                    field(
                      "glsls",
                      (json) =>
                        json
                        |> array(
                             (json) => {
                               type_: json |> field("type", string),
                               name: json |> field("name", string)
                             }
                           )
                    )
                  ),
             variables:
               json
               |> optional(
                    field(
                      "variables",
                      (json) => {
                        uniforms:
                          json
                          |> optional(
                               field(
                                 "uniforms",
                                 (json) =>
                                   json
                                   |> array(
                                        (json) => {
                                          name: json |> field("name", string),
                                          field: json |> field("field", string),
                                          type_: json |> field("type", string),
                                          from: json |> field("from", string)
                                        }
                                      )
                               )
                             ),
                        attributes:
                          json
                          |> optional(
                               field(
                                 "attributes",
                                 (json) =>
                                   json
                                   |> array(
                                        (json) => {
                                          name: json |> field("name", string),
                                          buffer: json |> field("buffer", string),
                                          type_: json |> field("type", string)
                                        }
                                      )
                               )
                             )
                      }
                    )
                  )
           }
         )
    )
  );

let createJobHandleMap = () =>
  HashMapSystem.(createEmpty() |> set("init_basic_material", BasicMaterialSystem.init));

let createState = () => {
  bufferConfig: None,
  renderConfig: {
    jobHandleMap: createJobHandleMap(),
    render_setting: convertRenderSettingToRecord(Render_setting.render_setting),
    init_pipelines: convertInitPipelinesToRecord(Init_pipelines.init_pipelines),
    init_jobs: convertInitJobsToRecord(Init_jobs.init_jobs),
    shaders: convertShadersToRecord(Shaders.shaders),
    shader_libs: convertShaderLibsToRecord(Shader_libs.shader_libs)
  },
  viewData: {canvas: None, contextConfig: None},
  initConfigData: {isTest: Some(false)},
  deviceManagerData: {gl: None},
  gameObjectData: GameObjectSystem.initData(),
  transformData: None,
  cameraControllerData: CameraControllerSystem.initData(),
  materialData: None,
  geometryData: None,
  shaderData: ShaderSystem.initData(),
  programData: ProgramSystem.initData(),
  glslSenderData: GLSLSenderSystem.initData(),
  glslChunkData: ShaderChunkSystem.initData()
};

let getOptionValueFromState = (value) => Js.Option.getExn(value);