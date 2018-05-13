let getRepeat = () => 0;

let getMirroredRepeat = () => 1;

let getClampToEdge = () => 2;

let getGlWrap = (gl, wrap) =>
  if (wrap === getRepeat()) {
    gl |> Gl.getRepeat
  } else if (wrap === getMirroredRepeat()) {
    gl |> Gl.getMirroredRepeat
  } else {
    gl |> Gl.getClampToEdge
  };