open StateDataMainType;

open WonderImgui;

let execJob = (flags, {imguiRecord} as state) => {
  ...state,
  imguiRecord:
    ManageIMGUIAPI.render(
      DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      imguiRecord,
    ),
};