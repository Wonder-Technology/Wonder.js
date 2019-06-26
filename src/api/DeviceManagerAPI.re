open StateDataMainType;

let unsafeGetGl = state =>
  AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

let setViewport = (viewportData, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setViewportOfGl(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         viewportData,
       ),
};

let setScissor = (scissorData, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setScissorOfGl(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         scissorData,
       ),
};

let setScissorTest = (targetScissorTest, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setScissorTest(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetScissorTest,
       ),
};

let setSide = (targetSide, state) => {
  ...state,
  deviceManagerRecord:
    AllDeviceManagerService.setSide(
      AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      targetSide,
      state.deviceManagerRecord,
    ),
};

let setStencilTest = (targetStencilTest, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setStencilTest(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetStencilTest,
       ),
};

let setStencilMask = (targetStencilMask, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setStencilMask(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         targetStencilMask,
       ),
};

let setStencilFunc =
    (targetStencilFunc, targetStencilRef, targetStencilMask, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setStencilFunc(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         (targetStencilFunc, targetStencilRef, targetStencilMask),
       ),
};

let setStencilOp =
    (targetStencilSFail, targetStencilDPFail, targetStencilDPPass, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setStencilOp(
         AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
         (targetStencilSFail, targetStencilDPFail, targetStencilDPPass),
       ),
};