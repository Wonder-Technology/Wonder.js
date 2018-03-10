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
      (state, offset + 16)
    }
  );

let render = (gl, uid, state: StateDataType.state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (uid, 64 * 16 * 4, 64, 64),
    (RenderBasicJobCommon.render, _fillMatrixTypeArr),
    state
  );