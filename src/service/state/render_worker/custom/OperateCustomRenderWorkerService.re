open StateDataRenderWorkerType;

let getCustomData = state =>
  state.customRecord.customDataFromRenderWorkerToMainWorker;

let setCustomData =
  (. customData: CustomWorkerDataType.customDataFromRenderWorkerToMainWorker, state) => {
    state.customRecord = {
      customDataFromRenderWorkerToMainWorker: Obj.magic(customData),
    };
    state;
  };