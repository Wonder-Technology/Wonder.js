open StateDataMainType;

let setIMGUIFunc = ManageIMGUIMainService.setIMGUIFunc;

let getSetting = state =>
  WonderImgui.ManageIMGUIAPI.getSetting(state.imguiRecord);

let setSetting = (setting, state) => {
  ...state,
  imguiRecord:
    WonderImgui.ManageIMGUIAPI.setSetting(setting, state.imguiRecord),
};