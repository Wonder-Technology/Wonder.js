let _fillMatrixTypeArr =
  (.
    transform,
    matricesArrayForInstance,
    state: SubStateGetRenderDataType.getRenderDataSubState,
    offset,
  ) => {
    RenderHardwareInstanceJobUtils.fillMatrixTypeArr(
      transform,
      matricesArrayForInstance,
      state,
      offset,
    )
    |> ignore;

    offset + 16;
  };

let render = (gl, indexTuple, state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (indexTuple, 64 * 16 * 4, 64, 64),
    (RenderBasicJobCommon.render, _fillMatrixTypeArr),
    state,
  );