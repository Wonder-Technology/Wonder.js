open MainStateDataType;

let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

let detect = (state: MainStateDataType.state) => {
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

let isSupportSharedArrayBuffer = (state: MainStateDataType.state) =>
  state.workerDetectRecord.isSupportSharedArrayBuffer;

let isSupportRenderWorkerAndSharedArrayBuffer = (state: MainStateDataType.state) =>
  state.workerDetectRecord.isSupportRenderWorkerAndSharedArrayBuffer;

let isUseWorker = (state: MainStateDataType.state) =>
  OperateSettingService.unsafeGetWorker(state.settingRecord).useWorker
  && isSupportRenderWorkerAndSharedArrayBuffer(state);