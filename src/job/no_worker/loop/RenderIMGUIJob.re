open StateDataMainType;

let execJob = (flags, state) =>
  {
    ...state,
    imguiRecord: {
      ...state.imguiRecord,
      wonderImguiIMGUIRecord:
        WonderImgui.ManageIMGUIService.render(
          DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
          RecordIMGUIMainService.getIOData(state),
          RecordIMGUIMainService.getWonderIMGUIRecord(state),
        ),
    },
  }
  |> IOIMGUIMainService.resetPointEventStateWhenPointUp;