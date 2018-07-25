open StateDataRenderWorkerType;

let getCustomDataFromRenderWorkerToMainWorker = state =>
  state.customRecord.customDataFromRenderWorkerToMainWorker;

let setCustomDataFromRenderWorkerToMainWorker =
  (.
    customData: CustomWorkerDataType.customDataFromRenderWorkerToMainWorker,
    state,
  ) => {
    state.customRecord = {
      ...state.customRecord,
      customDataFromRenderWorkerToMainWorker: Obj.magic(customData),
    };
    state;
  };

let getCustomDataFromMainWorkerToRenderWorker = state =>
  state.customRecord.customDataFromMainWorkerToRenderWorker;

let setCustomDataFromMainWorkerToRenderWorker =
  (.
    customData: CustomWorkerDataType.customDataFromMainWorkerToRenderWorker,
    state,
  ) => {
    state.customRecord = {
      ...state.customRecord,
      customDataFromMainWorkerToRenderWorker: Obj.magic(customData),
    };
    state;
  };