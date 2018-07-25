open StateDataMainType;

let prepareFontAsset = state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      IMGUITool.getWonderIMGUIRecord(state)
      |> WonderImgui.AssetTool.prepareFontAsset,
  },
};