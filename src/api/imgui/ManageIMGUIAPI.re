open StateDataMainType;

let setIMGUIFunc = (customData, func, state) => {
  ...state,
  imguiRecord:
    WonderImgui.ManageIMGUIAPI.setIMGUIFunc(
      customData,
      /* func(
           [@bs] FixedLayoutControlIMGUIAPI.label,
           [@bs] FixedLayoutControlIMGUIAPI.image,
         ), */
      func,
      state.imguiRecord,
    ),
};

let getSetting = state =>
  WonderImgui.ManageIMGUIAPI.getSetting(state.imguiRecord);

let setSetting = (setting, state) => {
  ...state,
  imguiRecord:
    WonderImgui.ManageIMGUIAPI.setSetting(setting, state.imguiRecord),
};