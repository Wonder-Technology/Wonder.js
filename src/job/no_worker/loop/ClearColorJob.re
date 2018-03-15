open MainStateDataType;

open RenderConfigType;

let execJob = (flags, _, state) => {
  ...state,
  deviceManagerRecord:
    DeviceManagerService.clearColor(
      [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
      ColorService.convert16HexToRGBA(JobConfigService.unsafeGetFlags(flags)[0]),
      state.deviceManagerRecord
    )
};