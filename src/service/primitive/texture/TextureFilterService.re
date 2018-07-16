open SourceTextureType;

let getGlFilter = (gl, filter) =>
  switch (filter) {
  | NEAREST => gl |> WonderWebgl.Gl.getNearest
  | LINEAR => gl |> WonderWebgl.Gl.getLinear
  | NEAREST_MIPMAP_NEAREST => gl |> WonderWebgl.Gl.getNearestMipmapNearest
  | LINEAR_MIPMAP_NEAREST => gl |> WonderWebgl.Gl.getLinearMipmapNearest
  | NEAREST_MIPMAP_LINEAR => gl |> WonderWebgl.Gl.getNearestMipmapLinear
  | LINEAR_MIPMAP_LINEAR => gl |> WonderWebgl.Gl.getLinearMipmapLinear
  };