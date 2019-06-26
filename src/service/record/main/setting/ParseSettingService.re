open SettingType;

open SettingGPUType;

let convertToRecord = setting => {
  open WonderBsJson.Json;
  open Decode;
  let json = setting;
  {
    isDebug: json |> optional(field("is_debug", bool)),
    canvasId: json |> optional(field("canvas_id", string)),
    memory:
      json
      |> optional(
           field("memory", json =>
             {
               maxDisposeCount: json |> field("max_dispose_count", int),
               maxTypeArrayPoolSize:
                 json |> field("max_type_array_pool_size", int),
               maxBigTypeArrayPoolSize:
                 json |> field("max_big_type_array_pool_size", int),
             }
           ),
         ),
    buffer:
      json
      |> optional(
           field("buffer", json =>
             {
               geometryPointCount: json |> field("geometry_point_count", int),
               geometryCount: json |> field("geometry_count", int),
               transformCount: json |> field("transform_count", int),
               basicMaterialCount: json |> field("basic_material_count", int),
               lightMaterialCount: json |> field("light_material_count", int),
               directionLightCount:
                 json |> field("direction_light_count", int),
               pointLightCount: json |> field("point_light_count", int),
               meshRendererCount: json |> field("meshRenderer_count", int),
               basicSourceTextureCount:
                 json |> field("basic_source_texture_count", int),
               arrayBufferViewSourceTextureCount:
                 json |> field("arrayBuffer_view_source_texture_count", int),
               cubemapTextureCount:
                 json |> field("cubemap_texture_count", int),
               instanceBuffer:
                 json
                 |> field("instance_buffer", json =>
                      {
                        sourceInstanceCount:
                          json |> field("sourceInstance_count", int),
                        objectInstanceCountPerSourceInstance:
                          json
                          |> field(
                               "objectInstance_count_per_source_instance",
                               int,
                             ),
                      }
                    ),
             }
           ),
         ),
    context:
      json
      |> optional(
           field("context", json =>
             {
               alpha: json |> field("alpha", bool),
               depth: json |> field("depth", bool),
               stencil: json |> field("stencil", bool),
               antialias: json |> field("antialias", bool),
               premultipliedAlpha: json |> field("premultiplied_alpha", bool),
               preserveDrawingBuffer:
                 json |> field("preserve_drawing_buffer", bool),
             }
           ),
         ),
    gpu:
      json
      |> optional(
           field("gpu", json =>
             {
               useHardwareInstance:
                 json |> field("use_hardware_instance", bool),
             }
           ),
         ),
    worker:
      json
      |> optional(
           field("worker", json =>
             {useWorker: json |> field("use_worker", bool)}
           ),
         ),
  };
};