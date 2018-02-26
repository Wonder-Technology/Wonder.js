open RenderConfigDataType;

let execJob = (flags, _, state) =>
  DeviceManagerSystem.clearColor(
    [@bs] DeviceManagerSystem.unsafeGetGl(state),
    ColorSystem.convert16HexToRGBA(JobConfigSystem.unsafeGetFlags(flags)[0]),
    state
  );