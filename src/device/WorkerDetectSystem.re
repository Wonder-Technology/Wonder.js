external jsObjToTypeofTarget : Js.t({..}) => Typeof.typeofTarget = "%identity";

let detect = (state: StateDataType.state) => {
  /* /*!
     for unit test
      */
     if (typeof root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
         WorkerDetectData.isSupportSharedArrayBuffer = root.isSupportSharedArrayBuffer_wonder;
         WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;

         return;
     } */
  let isSupportSharedArrayBuffer = ref(false);
  if (Typeof.typeof(Worker.sharedArrayBuffer |> jsObjToTypeofTarget) !== "undefined") {
    isSupportSharedArrayBuffer := true
  } else {
    isSupportSharedArrayBuffer := false
  };
  {
    ...state,
    workerDetectData: {
      isSupportSharedArrayBuffer: isSupportSharedArrayBuffer^,
      isSupportRenderWorkerAndSharedArrayBuffer:
        isSupportSharedArrayBuffer^ === false ?
          false :
          DetectUtils.hasProperty(
            "transferControlToOffscreen",
            DomUtils.buildDom("<canvas></canvas>")
          )
    }
  }
};

let isSupportSharedArrayBuffer = (state: StateDataType.state) =>
  state.workerDetectData.isSupportSharedArrayBuffer;

let isSupportRenderWorkerAndSharedArrayBuffer = (state: StateDataType.state) =>
  state.workerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
/* export var isSupportRenderWorkerAndSharedArrayBuffer = () => {
       return RenderWorkerConfig.useRenderWorker && WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
   } */
/*
 export var setWorkerConfig = (config: WorkerConfigData, WorkerDetectData: any) => {
     return IO.of(() => {
         WorkerDetectData.renderWorkerFileDir = config.renderWorkerFileDir;
     })
 } */
/* detect(WorkerDetectData); */