open RenderJobConfigType;

let execJob = ((flags: jobFlags, _), gl, state) =>
  switch flags {
  | None => RenderJobConfigSystem.throwJobFlagsShouldBeDefined()
  | Some(flags) =>
    DeviceManagerSystem.clearColor(gl, ColorSystem.convert16HexToRGBA(flags[0]), state)
  };