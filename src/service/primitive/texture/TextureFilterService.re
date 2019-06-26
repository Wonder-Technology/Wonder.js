open TextureType;

let getGlFilter = (gl, filter) =>
  switch (filter) {
  | Nearest => gl |> WonderWebgl.Gl.getNearest
  | Linear => gl |> WonderWebgl.Gl.getLinear
  | Nearest_mipmap_nearest => gl |> WonderWebgl.Gl.getNearestMipmapNearest
  | Linear_mipmap_nearest => gl |> WonderWebgl.Gl.getLinearMipmapNearest
  | Nearest_mipmap_linear => gl |> WonderWebgl.Gl.getNearestMipmapLinear
  | Linear_mipmap_linear => gl |> WonderWebgl.Gl.getLinearMipmapLinear
  };