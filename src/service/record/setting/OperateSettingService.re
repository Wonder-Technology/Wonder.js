open SettingType;

let setSetting = ({canvasId, memory, buffer, isDebug, context, gpu, worker}) => {
  canvasId,
  memory:
    switch memory {
    | None =>
      Some({maxDisposeCount: 1000, maxTypeArrayPoolSize: 5000, maxBigTypeArrayPoolSize: 100})
    | Some(memory) => Some(memory)
    },
  buffer:
    switch buffer {
    | None => Some({geometryPointDataBufferCount: 1000 * 1000})
    | Some(buffer) => Some(buffer)
    },
  isDebug:
    switch isDebug {
    | None => Some(false)
    | Some(isDebug) => Some(isDebug)
    },
  context:
    switch context {
    | None =>
      Some({
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
      })
    | Some(context) => Some(context)
    },
  gpu:
    switch gpu {
    | None => Some({useHardwareInstance: true})
    | Some(gpu) => Some(gpu)
    },
  worker:
    switch worker {
    | None => Some({useWorker: false})
    | Some(worker) => Some(worker)
    }
};

let unsafeGetBuffer = ({buffer}) => buffer |> OptionService.unsafeGet;

let getCanvasId = ({canvasId}) => canvasId;

let unsafeGetCanvasId = (record) => record |> getCanvasId |> OptionService.unsafeGet;

let unsafeGetMemory = ({memory}) => memory |> OptionService.unsafeGet;

let unsafeGetIsDebug = ({isDebug}) => isDebug |> OptionService.unsafeGet;

let unsafeGetGPU = ({gpu}) => gpu |> OptionService.unsafeGet;

let unsafeGetContext = ({context}) => context |> OptionService.unsafeGet;

let unsafeGetWorker = ({worker}) => worker |> OptionService.unsafeGet;