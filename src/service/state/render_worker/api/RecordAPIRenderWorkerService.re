open StateDataRenderWorkerType;

let getIMGUIAPIJsObj = state => state.apiRecord.imguiAPIJsObj;

let setIMGUIAPIJsObj = (imguiAPIJsObj, state) => {...state, apiRecord: imguiAPIJsObj};

let create = () => {
  imguiAPIJsObj: {
    "label": FixedLayoutControlIMGUIRenderWorkerService.label,
    "image": FixedLayoutControlIMGUIRenderWorkerService.image,
    "button": FixedLayoutControlIMGUIRenderWorkerService.button,
    "box": FixedLayoutControlIMGUIRenderWorkerService.box,
    "radioButton": FixedLayoutControlIMGUIRenderWorkerService.radioButton,
    "checkbox": FixedLayoutControlIMGUIRenderWorkerService.checkbox,
    "sliderInt": FixedLayoutControlIMGUIRenderWorkerService.sliderInt,
    "sliderFloat": FixedLayoutControlIMGUIRenderWorkerService.sliderFloat,
    "beginGroup": FixedLayoutControlIMGUIRenderWorkerService.beginGroup,
    "endGroup": FixedLayoutControlIMGUIRenderWorkerService.endGroup,
    "getCustomDataInRenderWorker": OperateCustomRenderWorkerService.getCustomDataInRenderWorker,
    "setCustomDataInRenderWorker": OperateCustomRenderWorkerService.setCustomDataInRenderWorker,
    "getCustomDataFromMainWorkerToRenderWorker": OperateCustomRenderWorkerService.getCustomDataFromMainWorkerToRenderWorker,
    "getCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.getCustomDataFromRenderWorkerToMainWorker,
    "setCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.setCustomDataFromRenderWorkerToMainWorker,
  },
};