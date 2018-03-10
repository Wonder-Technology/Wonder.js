open StateDataType;

let _fillMatrixTypeArr =
  [@bs]
  (
    (uid, matricesArrayForInstance, (state, offset)) => {
      let transform =
        GetComponentGameObjectService.unsafeGetTransformComponent(uid, state.gameObjectRecord);
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (matricesArrayForInstance, offset),
        (
          UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(
            transform,
            state.globalTempRecord,
            state.transformRecord
          ),
          0
        ),
        16
      )
      |> ignore;
      let (normalMatrix, _) =
        UpdateTransformService.updateAndGetNormalMatrixTypeArray(
          transform,
          state.globalTempRecord,
          state.transformRecord
        );
      TypeArrayService.fillFloat32ArrayWithFloat32Array(
        (matricesArrayForInstance, offset + 16),
        (normalMatrix, 0),
        9
      )
      |> ignore;
      (state, offset + 16 + 9)
    }
  );

let render = (gl, uid, state: StateDataType.state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (uid, 64 * (16 + 9) * 4, 112, 100),
    (FrontRenderLightJobCommon.render, _fillMatrixTypeArr),
    state
  );