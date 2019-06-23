open StateDataMainType;

let clear = sandbox => {
  open Sinon;
  restoreSandbox(refJsObjToSandbox(sandbox^));
  RenderWorkerStateTool.getStateData().state = None;
};

let _markWorker = (useWorker, state) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    worker:
      Some({
        ...state.settingRecord.worker |> OptionService.unsafeGet,
        useWorker,
      }),
  },
  workerDetectRecord: {
    ...state.workerDetectRecord,
    isSupportRenderWorkerAndSharedArrayBuffer: useWorker,
  },
};

let markUseWorker = state => _markWorker(true, state);

let markNotUseWorker = state => _markWorker(false, state);