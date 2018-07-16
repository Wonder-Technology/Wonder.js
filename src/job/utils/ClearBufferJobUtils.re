let _getBitFromFlags = (gl, (flag, flags), getBufferBitFunc, bit) =>
  Js.Array.includes(flag, flags) ?
    switch bit {
    | None => Some(getBufferBitFunc(gl))
    | Some(b) => Some(b lor getBufferBitFunc(gl))
    } :
    bit;

let getBit = (gl, flags) =>
  switch (
    _getBitFromFlags(gl, ("COLOR_BUFFER", flags), WonderWebgl.Gl.getColorBufferBit, None)
    |> _getBitFromFlags(gl, ("DEPTH_BUFFER", flags), WonderWebgl.Gl.getDepthBufferBit)
    |> _getBitFromFlags(gl, ("STENCIL_BUFFER", flags), WonderWebgl.Gl.getStencilBufferBit)
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