open StateDataMainType;

open RenderConfigType;

let execJob = (flags, _, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.clearColor(
      [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
      ColorService.convert16HexToRGBA(JobConfigUtils.getOperateType(flags)),
      state.deviceManagerRecord
    )
};