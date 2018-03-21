open SettingType;

let convertToRecord = (setting) => {
  open Json;
  open Decode;
  let json = setting;
  {
    isDebug: json |> optional(field("is_debug", bool)),
    canvasId: json |> optional(field("canvas_id", string)),
    memory:
      json
      |> optional(
           field(
             "memory",
             (json) => {
               maxDisposeCount: json |> field("maxDisposeCount", int),
               maxTypeArrayPoolSize: json |> field("maxTypeArrayPoolSize", int),
               maxBigTypeArrayPoolSize: json |> field("maxBigTypeArrayPoolSize", int)
             }
           )
         ),
    buffer:
      json
      |> optional(
           field(
             "buffer",
             (json) => {
               geometryPointDataBufferCount: json |> field("geometryPointDataBufferCount", int),
               transformDataBufferCount: json |> field("transformDataBufferCount", int),
               basicMaterialDataBufferCount:
                 json |> field("basicMaterialDataBufferCount", int),
               lightMaterialDataBufferCount:
                 json |> field("lightMaterialDataBufferCount", int)
             }
           )
         ),
    context:
      json
      |> optional(
           field(
             "context",
             (json) => {
               alpha: json |> field("alpha", bool),
               depth: json |> field("depth", bool),
               stencil: json |> field("stencil", bool),
               antialias: json |> field("antialias", bool),
               premultipliedAlpha: json |> field("premultiplied_alpha", bool),
               preserveDrawingBuffer: json |> field("preserve_drawing_buffer", bool)
             }
           )
         ),
    gpu:
      json
      |> optional(
           field(
             "gpu",
             (json) => {useHardwareInstance: json |> field("use_hardware_instance", bool)}
           )
         ),
    worker:
      json |> optional(field("worker", (json) => {useWorker: json |> field("use_worker", bool)}))
  }
};