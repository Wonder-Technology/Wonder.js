open StateRenderType;

let _fillMatrixTypeArr =
  [@bs]
  (
    (transform, matricesArrayForInstance, (state, offset) as tuple) => {
      RenderHardwareInstanceJobUtils.fillMatrixTypeArr(transform, matricesArrayForInstance, tuple)
      |> ignore;
      let normalMatrix =
        [@bs] GetTransformDataGetRenderDataService.getNormalMatrixTypeArray(transform, state);
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (matricesArrayForInstance, offset + 16),
        (normalMatrix, 0),
        9
      )
      |> ignore;
      (state, offset + 16 + 9)
    }
  );

let render = (gl, indexTuple, state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (indexTuple, 64 * (16 + 9) * 4, 112, 100),
    (FrontRenderLightJobCommon.render, _fillMatrixTypeArr),
    state
  );