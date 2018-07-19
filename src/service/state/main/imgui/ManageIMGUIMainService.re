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

let getCanvasSize = ({viewRecord}) =>
  switch (ViewService.getCanvas(viewRecord)) {
  | None => (0, 0)
  | Some(canvas) =>
    let canvas = Obj.magic(canvas);

    (canvas##width, canvas##height);
  };