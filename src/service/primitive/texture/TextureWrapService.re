open SourceTextureType;

let getGlWrap = (gl, wrap) =>
  switch (wrap) {
  | REPEAT => gl |> WonderWebgl.Gl.getRepeat
  | MIRRORED_REPEAT => gl |> WonderWebgl.Gl.getMirroredRepeat
  | CLAMP_TO_EDGE => gl |> WonderWebgl.Gl.getClampToEdge
  };