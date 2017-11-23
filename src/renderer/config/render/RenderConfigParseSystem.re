open StateDataType;

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

let _convertPipelinesToRecord = (pipelines) =>
  Render_setting.(
    Json.(
      Decode.(
        pipelines
        |> Js.Json.parseExn
        |> array(
             (json) => {
               name: json |> field("name", string),
               jobs:
                 json
                 |> field(
                      "jobs",
                      array(
                        (json) => {
                          name: json |> field("name", string),
                          flags: json |> optional(field("flags", (json) => json |> array(string)))
                        }
                      )
                    )
             }
           )
      )
    )
  );

let _convertJobsToRecord = (jobs) =>
  Render_setting.(
    Json.(
      Decode.(
        jobs
        |> Js.Json.parseExn
        |> array(
             (json) => {
               name: json |> field("name", string),
               shader: json |> optional(field("shader", string))
             }
           )
      )
    )
  );

let convertInitPipelinesToRecord = (init_pipelines) => _convertPipelinesToRecord(init_pipelines);

let convertInitJobsToRecord = (init_jobs) => _convertJobsToRecord(init_jobs);

let convertRenderPipelinesToRecord = (render_pipelines) =>
  _convertPipelinesToRecord(render_pipelines);

let convertRenderJobsToRecord = (render_jobs) => _convertJobsToRecord(render_jobs);

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
                  (json) => {
                    name: json |> field("name", string),
                    value: json |> field("value", array(string))
                  }
                )
         ),
    basic_material:
      json
      |> field(
           "basic_material",
           (json) => {
             material_shader:
               json
               |> field(
                    "material_shader",
                    (json) => {
                      shader_libs:
                        json
                        |> field(
                             "shader_libs",
                             array(
                               fun (json) => (
                                 {
                                   type_: json |> optional(field("type", string)),
                                   name: json |> field("name", string)
                                 }: shaderLibItem
                               )
                             )
                           )
                    }
                  )
           }
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
                                          name: json |> optional(field("name", string)),
                                          buffer: json |> field("buffer", string),
                                          type_: json |> optional(field("type", string))
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