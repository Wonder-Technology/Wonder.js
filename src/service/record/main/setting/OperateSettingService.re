open SettingType;

let setSetting = ({canvasId, memory, buffer, isDebug, context, gpu, worker}) => {
  canvasId,
  memory:
    switch (memory) {
    | None =>
      Some({
        maxDisposeCount: 1000,
        maxTypeArrayPoolSize: 5000,
        maxBigTypeArrayPoolSize: 100,
      })
    | Some(memory) => Some(memory)
    },
  buffer:
    switch (buffer) {
    | None =>
      Some({
        geometryPointCount: 1000 * 1000,
        geometryCount: 1000,
        transformCount: 10 * 1000,
        basicMaterialCount: 10 * 1000,
        lightMaterialCount: 10 * 1000,
        directionLightCount: 1 * 1000,
        pointLightCount: 1 * 1000,
        meshRendererCount: 10 * 1000,
        basicSourceTextureCount: 64,
        arrayBufferViewSourceTextureCount: 64,
        instanceBuffer: {
          sourceInstanceCount: 2,
          objectInstanceCountPerSourceInstance: 10000,
        },
      })
    | Some(buffer) => Some(buffer)
    },
  isDebug:
    switch (isDebug) {
    | None => Some(false)
    | Some(isDebug) => Some(isDebug)
    },
  context:
    switch (context) {
    | None =>
      Some({
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
      })
    | Some(context) => Some(context)
    },
  gpu:
    switch (gpu) {
    | None => Some({useHardwareInstance: true})
    | Some(gpu) => Some(gpu)
    },
  worker:
    switch (worker) {
    | None => Some({useWorker: false})
    | Some(worker) => Some(worker)
    },
};

let getCanvasId = ({canvasId}) => canvasId;

let unsafeGetCanvasId = record =>
  record |> getCanvasId |> OptionService.unsafeGet;

let unsafeGetMemory = ({memory}) => memory |> OptionService.unsafeGet;

let unsafeGetIsDebug = ({isDebug}) => isDebug |> OptionService.unsafeGet;

let unsafeGetGPU = ({gpu}) => gpu |> OptionService.unsafeGet;

let unsafeGetContext = ({context}) => context |> OptionService.unsafeGet;

let unsafeGetWorker = ({worker}) => worker |> OptionService.unsafeGet;