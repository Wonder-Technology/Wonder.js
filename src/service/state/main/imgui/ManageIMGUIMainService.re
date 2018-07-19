open StateDataMainType;

let getIMGUIFunc = state =>
  WonderImgui.ManageIMGUIAPI.getIMGUIFunc(state.imguiRecord);

let setIMGUIFunc = (customData, func, state) => {
  ...state,
  imguiRecord:
    WonderImgui.ManageIMGUIAPI.setIMGUIFunc(
      customData,
      func,
      state.imguiRecord,
    ),
};

let getCustomData = state =>
  WonderImgui.ManageIMGUIAPI.getCustomData(state.imguiRecord);