open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  imguiRecord:
    WonderImgui.ManageIMGUIAPI.init(
      DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      state.imguiRecord,
    ),
};