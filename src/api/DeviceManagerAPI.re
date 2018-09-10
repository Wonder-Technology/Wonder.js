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
       ),
};

let setScissor = (scissorData, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setScissorOfGl(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         scissorData,
       ),
};

let setScissorTest = (targetScissorTest, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setScissorTest(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetScissorTest,
       ),
};

let setSide = (targetSide, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.setSide(
      DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      targetSide,
      state.deviceManagerRecord,
    ),
};