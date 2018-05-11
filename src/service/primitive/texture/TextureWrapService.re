let getWrapRepeat = () => 0;

let getWrapMirroredRepeat = () => 1;

let getWrapClampToEdge = () => 2;

let getGlWrap = (gl, wrap) =>
  if (wrap === getWrapRepeat()) {
    gl |> Gl.getRepeat
  } else if (wrap === getWrapMirroredRepeat()) {
    gl |> Gl.getMirroredRepeat
  } else {
    gl |> Gl.getClampToEdge
  };