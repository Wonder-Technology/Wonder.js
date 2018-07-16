open StateDataMainType;

open WonderImgui;

let execJob = (_, state) => {
  ...state,
  imguiRecord:
    ManageIMGUIAPI.init(
      DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      state.imguiRecord,
    ),
};