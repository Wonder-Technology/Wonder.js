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

let setStencilTest = (targetStencilTest, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setStencilTest(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetStencilTest,
       ),
};

let setStencilMask = (targetStencilMask, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setStencilMask(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetStencilMask,
       ),
};

let setStencilFunc =
    (targetStencilFunc, targetStencilRef, targetStencilMask, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setStencilFunc(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         (targetStencilFunc, targetStencilRef, targetStencilMask),
       ),
};

let setStencilOp =
    (targetStencilSFail, targetStencilDPFail, targetStencilDPPass, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setStencilOp(
         DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         (targetStencilSFail, targetStencilDPFail, targetStencilDPPass),
       ),
};