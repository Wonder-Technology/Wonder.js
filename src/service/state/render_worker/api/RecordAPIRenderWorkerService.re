open StateDataRenderWorkerType;

let getIMGUIAPIJsObj = state => state.apiRecord.imguiAPIJsObj;

let setIMGUIAPIJsObj = (imguiAPIJsObj, state) => {
  ...state,
  apiRecord: imguiAPIJsObj,
};

let create = () => {
  imguiAPIJsObj: {
    "label": FixedLayoutControlIMGUIRenderWorkerService.label,
    "image": FixedLayoutControlIMGUIRenderWorkerService.image,
    "button": ExtendIMGUIRenderWorkerService.Button.button,
    "box": FixedLayoutControlIMGUIRenderWorkerService.box,
    "beginGroup": FixedLayoutControlIMGUIRenderWorkerService.beginGroup,
    "endGroup": FixedLayoutControlIMGUIRenderWorkerService.endGroup,
    "getCustomDataInRenderWorker": OperateCustomRenderWorkerService.getCustomDataInRenderWorker,
    "setCustomDataInRenderWorker": OperateCustomRenderWorkerService.setCustomDataInRenderWorker,
    "getCustomDataFromMainWorkerToRenderWorker": OperateCustomRenderWorkerService.getCustomDataFromMainWorkerToRenderWorker,
    "getCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.getCustomDataFromRenderWorkerToMainWorker,
    "setCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.setCustomDataFromRenderWorkerToMainWorker,
  },
};