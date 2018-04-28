open RenderConfigType;

/* let convertRenderSettingToRecord = (render_setting) => {
     open Json;
     open Decode;
     let json = render_setting;
     {
       /* platform: json |> field("platform", string),
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
               ), */
     }
   }; */
let _convertShaderMapData = (json) =>
  Json.(
    Decode.(
      json
      |> array(
           (json) => {
             name: json |> field("name", string),
             value: json |> field("value", array(string))
           }
         )
    )
  );

let convertShadersToRecord = (shaders) => {
  open Json;
  open Decode;
  let json = shaders;
  {
    staticBranchs: json |> field("staticBranchs", (json) => _convertShaderMapData(json)),
    groups: json |> field("groups", (json) => _convertShaderMapData(json)),
    materialShaders:
      json
      |> field(
           "materialShaders",
           (json) =>
             json
             |> array(
                  (json) => {
                    name: json |> field("name", string),
                    shaderLibs:
                      json
                      |> field(
                           "shaderLibs",
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
         )
  }
};

let _convertGlslToRecord = (json) =>
  Json.(
    Decode.(
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
         )
    )
  );

let _convertVariableToRecord = (json) =>
  Json.(
    Decode.(
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
    )
  );

let convertShaderLibsToRecord = (shaderLibs) =>
  Json.(
    Decode.(
      shaderLibs
      |> array(
           (json) => {
             name: json |> field("name", string),
             glsls: _convertGlslToRecord(json),
             variables: _convertVariableToRecord(json)
           }
         )
    )
  );