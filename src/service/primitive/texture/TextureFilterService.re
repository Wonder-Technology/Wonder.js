let getNearest = () => 0;

let getNearestMipmapNearest = () => 1;

let getNearestMipmapLinear = () => 2;

let getLinear = () => 3;

let getLinearMipmapNearest = () => 4;

let getLinearMipmapLinear = () => 5;

let getGlFilter = (gl, filter) =>
  if (filter === getNearest()) {
    gl |> Gl.getNearest
  } else if (filter === getNearestMipmapNearest()) {
    gl |> Gl.getNearestMipmapNearest
  } else if (filter === getNearestMipmapLinear()) {
    gl |> Gl.getNearestMipmapLinear
  } else if (filter === getLinear()) {
    gl |> Gl.getLinear
  } else if (filter === getLinearMipmapNearest()) {
    gl |> Gl.getLinearMipmapNearest
  } else {
    gl |> Gl.getLinearMipmapLinear
  };