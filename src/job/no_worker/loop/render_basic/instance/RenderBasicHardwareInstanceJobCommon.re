open StateDataMainType;

let _fillMatrixTypeArr =
  [@bs]
  (
    (transform, matricesArrayForInstance, (state, offset) as tuple) => {
      RenderHardwareInstanceJobUtils.fillMatrixTypeArr(transform, matricesArrayForInstance, tuple)
      |> ignore;
      (state, offset + 16)
    }
  );

let render = (gl, indexTuple, state: StateDataMainType.state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (indexTuple, 64 * 16 * 4, 64, 64),
    (RenderBasicJobCommon.render, _fillMatrixTypeArr),
    state
  );