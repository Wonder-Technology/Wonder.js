open StateDataMainType;

let execJob = (flags, state) =>
  WonderImgui.ManageIMGUIService.render(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    RecordIMGUIMainService.getIOData(state),
    RecordIMGUIAPIMainService.getIMGUIAPIJsObj(state) |> Obj.magic,
    (
      ManageIMGUIMainService.getRecord |> Obj.magic,
      ManageIMGUIMainService.setRecord |> Obj.magic,
    ),
    state |> Obj.magic,
  )
  |> Obj.magic
  |> IOIMGUIMainService.resetPointEventStateWhenPointUp;