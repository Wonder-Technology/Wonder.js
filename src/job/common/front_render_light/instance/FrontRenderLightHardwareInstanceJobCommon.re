let _fillMatrixTypeArr =
  (.
    transform,
    matricesArrayForInstance,
    state: SubStateGetRenderDataType.getRenderDataSubState,
    offset: int,
  ) => {
    RenderHardwareInstanceJobUtils.fillMatrixTypeArr(
      transform,
      matricesArrayForInstance,
      state,
      offset,
    )
    |> ignore;
    let normalMatrix =
      GetTransformDataGetRenderDataService.getNormalMatrixTypeArray(.
        transform,
        state,
      );
    TypeArrayService.fillFloat32ArrayWithFloat32Array(
      (matricesArrayForInstance, offset + 16),
      (normalMatrix, 0),
      9,
    )
    |> ignore;

    offset + 16 + 9;
  };

let render = (gl, indexTuple, state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (indexTuple, 64 * (16 + 9) * 4, 112, 100),
    (FrontRenderLightJobCommon.render, _fillMatrixTypeArr),
    state,
  );