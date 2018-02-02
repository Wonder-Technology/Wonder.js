open StateDataType;

let _getBitFromFlags = (gl, (flag, flags), getBufferBitFunc, bit) =>
  Js.Array.includes(flag, flags) ?
    switch bit {
    | None => Some(getBufferBitFunc(gl))
    | Some(b) => Some(b lor getBufferBitFunc(gl))
    } :
    bit;

let _getBit = (gl, flags) =>
  switch (
    _getBitFromFlags(gl, ("COLOR_BUFFER", flags), Gl.getColorBufferBit, None)
    |> _getBitFromFlags(gl, ("DEPTH_BUFFER", flags), Gl.getDepthBufferBit)
    |> _getBitFromFlags(gl, ("STENCIL_BUFFER", flags), Gl.getStencilBufferBit)
  ) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getBit",
        ~description={j|should find bit|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|flags:$flags|j}
      )
    )
  | Some(bit) => bit
  };

let getJob = ((flags, _), gl, state) =>
  switch flags {
  | None => RenderJobConfigSystem.throwJobFlagsShouldBeDefined()
  | Some(flags) => DeviceManagerSystem.clearBuffer(gl, _getBit(gl, flags), state)
  };