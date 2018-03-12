open RenderConfigType;

let execJob = (flags, _, state) =>
  DeviceManagerSystem.clearColor(
    [@bs] DeviceManagerSystem.unsafeGetGl(state),
    ColorSystem.convert16HexToRGBA(JobConfigService.unsafeGetFlags(flags)[0]),
    state
  );