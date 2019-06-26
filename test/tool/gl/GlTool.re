open StateDataMainType;

let unsafeGetGl =
  [@bs] ((state) => [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord));

let unsafeGetGlFromRenderState =
  [@bs]
  (
    (state: StateRenderType.renderState) =>
      [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  );