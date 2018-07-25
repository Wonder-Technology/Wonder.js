open StateDataRenderWorkerType;

let getAPIJsObj = state => state.apiRecord.apiJsObj;

let setAPIJsObj = (apiJsObj, state) => {...state, apiRecord: apiJsObj};

let create = () => {
  apiJsObj: {
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
    "getCustomDataFromMainWorkerToRenderWorker": OperateCustomRenderWorkerService.getCustomDataFromMainWorkerToRenderWorker,
    "getCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.getCustomDataFromRenderWorkerToMainWorker,
    "setCustomDataFromRenderWorkerToMainWorker": OperateCustomRenderWorkerService.setCustomDataFromRenderWorkerToMainWorker,
  },
};