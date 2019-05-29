open StateDataMainType;

let clear = sandbox => {
  open Sinon;
  restoreSandbox(refJsObjToSandbox(sandbox^));
  RenderWorkerStateTool.getStateData().state = None;
};

let markUseWorker = state => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    worker:
      Some({
        ...state.settingRecord.worker |> OptionService.unsafeGet,
        useWorker: true,
      }),
  },
  workerDetectRecord: {
    ...state.workerDetectRecord,
    isSupportRenderWorkerAndSharedArrayBuffer: true,
  },
};