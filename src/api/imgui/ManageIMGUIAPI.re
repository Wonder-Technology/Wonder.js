open StateDataMainType;

open WonderImgui;

let setIMGUIFunc = (func, state) => {
  ...state,
  imguiRecord: ManageIMGUIAPI.setIMGUIFunc(func, state.imguiRecord),
};


