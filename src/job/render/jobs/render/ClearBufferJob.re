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
  | None => ExceptionHandleSystem.throwMessage("should find bit")
  | Some(bit) => bit
  };

let getJob = ((flags, _), gl, state) =>
  switch flags {
  | None => RenderConfigSystem.throwJobFlagsShouldBeDefined()
  | Some(flags) => DeviceManagerSystem.clearBuffer(gl, _getBit(gl, flags), state)
  };