open StateDataMainType;

let markIsSupportRenderWorkerAndSharedArrayBuffer =
    (isSupportRenderWorkerAndSharedArrayBuffer, state) => {
  ...state,
  workerDetectRecord: {...state.workerDetectRecord, isSupportRenderWorkerAndSharedArrayBuffer}
};