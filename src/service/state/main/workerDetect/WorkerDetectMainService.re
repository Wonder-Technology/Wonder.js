open StateDataMainType;

let detect = (state: StateDataMainType.state) => {
  let isSupportSharedArrayBuffer = Worker.isSupportSharedArrayBuffer();
  {
    ...state,
    workerDetectRecord: {
      isSupportSharedArrayBuffer,
      isSupportRenderWorkerAndSharedArrayBuffer:
        ! isSupportSharedArrayBuffer ?
          false :
          DetectService.hasProperty(
            "transferControlToOffscreen",
            DomService.buildCanvas() |> Obj.magic,
          ),
    },
  };
};

let isSupportSharedArrayBuffer = (state: StateDataMainType.state) =>
  state.workerDetectRecord.isSupportSharedArrayBuffer;

let isSupportRenderWorkerAndSharedArrayBuffer =
    (state: StateDataMainType.state) =>
  state.workerDetectRecord.isSupportRenderWorkerAndSharedArrayBuffer;

let isUseWorker = (state: StateDataMainType.state) =>
  OperateSettingService.unsafeGetWorker(state.settingRecord).useWorker
  && isSupportRenderWorkerAndSharedArrayBuffer(state);