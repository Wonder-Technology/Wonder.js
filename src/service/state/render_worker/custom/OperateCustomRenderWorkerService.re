open StateDataRenderWorkerType;

let getCustomDataInRenderWorker = state =>
  state.customRecord.customDataInRenderWorker;

let setCustomDataInRenderWorker =
  (. customData: RenderWorkerCustomType.customDataInRenderWorker, state) => {
    state.customRecord = {
      ...state.customRecord,
      customDataInRenderWorker: Obj.magic(customData),
    };
    state;
  };

let getCustomDataFromRenderWorkerToMainWorker = state =>
  state.customRecord.customDataFromRenderWorkerToMainWorker;

let setCustomDataFromRenderWorkerToMainWorker =
  (.
    customData: CustomAllWorkerDataType.customDataFromRenderWorkerToMainWorker,
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
    customData: CustomAllWorkerDataType.customDataFromMainWorkerToRenderWorker,
    state,
  ) => {
    state.customRecord = {
      ...state.customRecord,
      customDataFromMainWorkerToRenderWorker: Obj.magic(customData),
    };
    state;
  };