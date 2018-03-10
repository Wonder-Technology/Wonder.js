let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

let detect = (state: StateDataType.state) => {
  /* /*!
     for unit test
      */
     if (typeof root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
         WorkerDetectData.isSupportSharedArrayBuffer = root.isSupportSharedArrayBuffer_wonder;
         WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;

         return;
     } */
  let isSupportSharedArrayBuffer = _isSupportSharedArrayBuffer();
  {
    ...state,
    workerDetectData: {
      isSupportSharedArrayBuffer,
      isSupportRenderWorkerAndSharedArrayBuffer:
        ! isSupportSharedArrayBuffer ?
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

let isUseWorker = (state: StateDataType.state) =>
  WorkerConfigSystem.getConfig(state).useWorker && isSupportRenderWorkerAndSharedArrayBuffer(state);