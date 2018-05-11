let getFilterNearest = () => 0;

let getFilterNearestMipmapNearest = () => 1;

let getFilterNearestMipmapLinear = () => 2;

let getFilterLinear = () => 3;

let getFilterLinearMipmapNearest = () => 4;

let getFilterLinearMipmapLinear = () => 5;

let getGlFilter = (gl, filter) =>
  if (filter === getFilterNearest()) {
    gl |> Gl.getNearest
  } else if (filter === getFilterNearestMipmapNearest()) {
    gl |> Gl.getNearestMipmapNearest
  } else if (filter === getFilterNearestMipmapLinear()) {
    gl |> Gl.getNearestMipmapLinear
  } else if (filter === getFilterLinear()) {
    gl |> Gl.getLinear
  } else if (filter === getFilterLinearMipmapNearest()) {
    gl |> Gl.getLinearMipmapNearest
  } else {
    gl |> Gl.getLinearMipmapLinear
  };