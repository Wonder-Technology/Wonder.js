let _fillMatrixTypeArr =
  [@bs]
  (
    (uid, matricesArrayForInstance, (state, offset)) => {
      let transform = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
      TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
        (matricesArrayForInstance, offset),
        (TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state), 0),
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