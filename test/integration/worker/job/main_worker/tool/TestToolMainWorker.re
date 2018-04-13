open WorkerDetectType;

let initWithJobConfig =
    (
      ~sandbox,
      ~isDebug="true",
      ~canvasId=None,
      ~useHardwareInstance="true",
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~workerJobRecord=WorkerJobTool.buildWorkerJobConfig(),
      ~renderConfigRecord=RenderConfigTool.buildRenderConfig(),
      ()
    ) =>
  SettingToolWorker.createStateAndSetToStateData(
    ~state={
      let state = CreateStateMainService.createState();
      {
        ...state,
        workerDetectRecord: {
          ...state.workerDetectRecord,
          isSupportRenderWorkerAndSharedArrayBuffer: true
        }
      }
    },
    ~isDebug,
    ~useWorker="true",
    ~canvasId,
    ~context,
    ~useHardwareInstance,
    ()
  )
  |> WorkerJobTool.create(workerJobRecord)
  |> RenderConfigTool.create(renderConfigRecord)
  |> MainStateTool.setState
  |> ignore;