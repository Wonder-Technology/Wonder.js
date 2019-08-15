open StateDataMainType;

let execJob = (_, {imguiRecord, viewRecord} as state) => {
  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let state = state |> IOIMGUIMainService.bindEvent;

  {
    ...state,
    imguiRecord: {
      ...imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.ManageIMGUIAPI.init(
          gl,
          ManageIMGUIMainService.getCanvasSize(state),
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  }
  |> ExtendIMGUIMainService.ExtendData.CustomControl.registerAllCustomControlsToWonderImguiIMGUIRecord
  |> ExtendIMGUIMainService.ExtendData.Skin.mergeAllSkinDataMapsToWonderImguiIMGUIRecord;
};