open StateDataMainType;

let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

let detect = (state: StateDataMainType.state) => {
  let isSupportSharedArrayBuffer = _isSupportSharedArrayBuffer();
  {
    ...state,
    workerDetectRecord: {
      isSupportSharedArrayBuffer,
      isSupportRenderWorkerAndSharedArrayBuffer:
        ! isSupportSharedArrayBuffer ?
          false :
          DetectService.hasProperty(
            "transferControlToOffscreen",
            DomService.buildDom("<canvas></canvas>")
          )
    }
  }
};

let isSupportSharedArrayBuffer = (state: StateDataMainType.state) =>
  state.workerDetectRecord.isSupportSharedArrayBuffer;

let isSupportRenderWorkerAndSharedArrayBuffer = (state: StateDataMainType.state) =>
  state.workerDetectRecord.isSupportRenderWorkerAndSharedArrayBuffer;

let isUseWorker = (state: StateDataMainType.state) =>
  OperateSettingService.unsafeGetWorker(state.settingRecord).useWorker
  && isSupportRenderWorkerAndSharedArrayBuffer(state);