type imguiFunc =
  (
    . WonderImgui.IMGUIType.customDataForIMGUIFunc,
    WonderImgui.IMGUIType.apiJsObj,
    StateDataMainType.state
  ) =>
  StateDataMainType.state;

external imguiFuncToWonderIMGUIIMGUIFunc:
  imguiFunc => WonderImgui.IMGUIType.imguiFunc =
  "%identity";