type execFunc =
  (
    . WonderImgui.IMGUIType.customData,
    WonderImgui.IMGUIType.apiJsObj,
    StateDataMainType.state
  ) =>
  StateDataMainType.state;

type execFuncData = {
  execFunc,
  customData: WonderImgui.IMGUIType.customData,
  execOrder: WonderImgui.IMGUIType.execFuncExecOrder,
  name: WonderImgui.IMGUIType.execFuncName,
};

type execFuncDataArr = array(execFuncData);

external wonderExecFuncToWonderIMGUIExecFunc:
  execFunc => WonderImgui.IMGUIType.execFunc =
  "%identity";

external wonderIMGUIExecFuncDataArrToWonderFuncDataArr:
  WonderImgui.IMGUIType.execFuncDataArr => execFuncDataArr =
  "%identity";

external wonderExecFuncDataArrToWonderIMGUIExecFuncDataArr:
  execFuncDataArr => WonderImgui.IMGUIType.execFuncDataArr =
  "%identity";