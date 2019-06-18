open TextureType;

let getGlWrap = (gl, wrap) =>
  switch (wrap) {
  | Repeat => gl |> WonderWebgl.Gl.getRepeat
  | Mirrored_repeat => gl |> WonderWebgl.Gl.getMirroredRepeat
  | Clamp_to_edge => gl |> WonderWebgl.Gl.getClampToEdge
  };