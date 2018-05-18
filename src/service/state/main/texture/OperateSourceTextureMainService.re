let setFlipY = (gl, flipY, browserRecord) =>
  gl |> Gl.pixelStorei(Gl.getUnpackFlipYWebgl(gl), flipY);