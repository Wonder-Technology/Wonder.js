open StateDataMainType;

let getAPIJsObj = state => state.apiRecord.apiJsObj;

let setAPIJsObj = (apiJsObj, state) => {...state, apiRecord: apiJsObj};

let create = () => {
  /* TODO add more api */
  apiJsObj: {
    "label": FixedLayoutControlIMGUIMainService.label,
    "image": FixedLayoutControlIMGUIMainService.image,
    "button": FixedLayoutControlIMGUIMainService.button,
    "box": FixedLayoutControlIMGUIMainService.box,
    "radioButton": FixedLayoutControlIMGUIMainService.radioButton,
    "checkbox": FixedLayoutControlIMGUIMainService.checkbox,
    "sliderInt": FixedLayoutControlIMGUIMainService.sliderInt,
    "sliderFloat": FixedLayoutControlIMGUIMainService.sliderFloat,
    "beginGroup": FixedLayoutControlIMGUIMainService.beginGroup,
    "endGroup": FixedLayoutControlIMGUIMainService.endGroup,
    "setLightMaterialDiffuseColor": LightMaterialAPI.setLightMaterialDiffuseColor,
    "getRenderWorkerCustomData": OperateWorkerDataMainService.getRenderWorkerCustomData,
  },
};