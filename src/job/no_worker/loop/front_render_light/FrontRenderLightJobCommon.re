open StateDataMainType;

let render =
  [@bs]
  (
    (gl, indexTuple, state: StateDataMainType.state) => RenderJobUtils.render(gl, indexTuple, state)
  );