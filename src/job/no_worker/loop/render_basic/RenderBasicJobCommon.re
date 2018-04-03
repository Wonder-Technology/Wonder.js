open MainStateDataType;

let render =
  [@bs]
  (
    (gl, indexTuple, state: MainStateDataType.state) => RenderJobUtils.render(gl, indexTuple, state)
  );