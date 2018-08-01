open StateDataMainType;

let unsafeGetGl = state =>
  DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

let setViewport = (viewportData, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setViewportOfGl(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         viewportData,
       )
    |> DeviceManagerService.setViewportData(viewportData),
};