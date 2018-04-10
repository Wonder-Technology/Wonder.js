/* TODO duplicate */
open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.deviceManagerRecord =
        DeviceManagerService.clearColor(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          ColorService.convert16HexToRGBA(JobConfigUtils.getOperateType(flags)),
          state.deviceManagerRecord
        );
      e
    }
  );