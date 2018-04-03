/* open MainStateDataType;

let _fillMatrixTypeArr =
  [@bs]
  (
    (uid, matricesArrayForInstance, (state, offset) as tuple) => {
      let transform =
        GetComponentGameObjectService.unsafeGetTransformComponent(uid, state.gameObjectRecord);
      RenderHardwareInstanceJobUtils.fillMatrixTypeArr(
        uid,
        transform,
        matricesArrayForInstance,
        tuple
      )
      |> ignore;
      let (normalMatrix, _) =
        UpdateTransformService.updateAndGetNormalMatrixTypeArray(
          transform,
          state.globalTempRecord,
          state |> RecordTransformMainService.getRecord
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

let render = (gl, uid, state: MainStateDataType.state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (uid, 64 * (16 + 9) * 4, 112, 100),
    (FrontRenderLightJobCommon.render, _fillMatrixTypeArr),
    state
  ); */