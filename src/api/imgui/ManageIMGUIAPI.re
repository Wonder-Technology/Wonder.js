open StateDataMainType;

let setIMGUIFunc = ManageIMGUIMainService.setIMGUIFunc;

let getSetting = state =>
  WonderImgui.ManageIMGUIAPI.getSetting(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let setSetting = (setting, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.setSetting(
        setting,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};

let sendUniformProjectionMatData = (gl, canvasSize, state) => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.ManageIMGUIAPI.sendUniformProjectionMatData(
        gl,
        canvasSize,
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};