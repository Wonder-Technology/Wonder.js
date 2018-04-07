open StateDataMainType;

let unsafeGetGl =
  [@bs] ((state) => [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord));

let unsafeGetGlFromRenderState =
  [@bs]
  (
    (state: StateRenderType.renderState) =>
      [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord)
  );