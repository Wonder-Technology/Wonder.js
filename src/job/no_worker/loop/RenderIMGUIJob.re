open StateDataMainType;

let execJob = (flags, state) =>
  /* {
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
     } */
  WonderImgui.ManageIMGUIService.render(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    RecordIMGUIMainService.getIOData(state),
    RecordAPIMainService.getAPIJsObj(state) |> Obj.magic,
    (
      ManageIMGUIMainService.getRecord |> Obj.magic,
      ManageIMGUIMainService.setRecord |> Obj.magic,
    ),
    state |> Obj.magic,
  )
  |> Obj.magic
  |> IOIMGUIMainService.resetPointEventStateWhenPointUp;