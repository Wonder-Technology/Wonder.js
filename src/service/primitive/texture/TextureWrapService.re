open SourceTextureType;

let getGlWrap = (gl, wrap) =>
  switch (wrap) {
  | REPEAT => gl |> Gl.getRepeat
  | MIRRORED_REPEAT => gl |> Gl.getMirroredRepeat
  | CLAMP_TO_EDGE => gl |> Gl.getClampToEdge
  };