open StateDataType;

let _getBitFromFlags = (gl, flags) => {
  let bit = ref(None);
  if (Js.Array.includes("COLOR_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getColorBufferBit(gl))
    | Some(b) => bit := Some(b lor Gl.getColorBufferBit(gl))
    }
  };
  if (Js.Array.includes("DEPTH_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getDepthBufferBit(gl))
    | Some(b) => bit := Some(b lor Gl.getDepthBufferBit(gl))
    }
  };
  if (Js.Array.includes("STENCIL_BUFFER", flags)) {
    switch bit^ {
    | None => bit := Some(Gl.getStencilBufferBit(gl))
    | Some(b) => bit := Some(b lor Gl.getStencilBufferBit(gl))
    }
  };
  Js.Option.getExn(bit^)
};

let getJob = ((flags, _), gl, state) =>
  switch flags {
  | None => RenderConfigSystem.throwJobFlagsShouldBeDefined()
  | Some(flags) => DeviceManagerSystem.clearBuffer(gl, _getBitFromFlags(gl, flags), state)
  };