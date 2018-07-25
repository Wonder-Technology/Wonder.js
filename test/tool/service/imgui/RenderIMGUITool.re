open StateDataMainType;

let prepareFntData = state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.RenderIMGUITool.prepareFntData(
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};