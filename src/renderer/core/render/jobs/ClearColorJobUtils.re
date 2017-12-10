open StateDataType;

let getJob = ((flags: jobFlags, _), gl, state) =>
  switch flags {
  | None => RenderConfigSystem.throwJobFlagsShouldBeDefined()
  | Some(flags) =>
    DeviceManagerSystem.clearColor(gl, ColorSystem.convert16HexToRGBA(flags[0]), state)
  };