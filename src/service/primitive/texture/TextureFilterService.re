open SourceTextureType;

let getGlFilter = (gl, filter) =>
  switch (filter) {
  | NEAREST => gl |> Gl.getNearest
  | LINEAR => gl |> Gl.getLinear
  | NEAREST_MIPMAP_NEAREST => gl |> Gl.getNearestMipmapNearest
  | LINEAR_MIPMAP_NEAREST => gl |> Gl.getLinearMipmapNearest
  | NEAREST_MIPMAP_LINEAR => gl |> Gl.getNearestMipmapLinear
  | LINEAR_MIPMAP_LINEAR => gl |> Gl.getLinearMipmapLinear
  };