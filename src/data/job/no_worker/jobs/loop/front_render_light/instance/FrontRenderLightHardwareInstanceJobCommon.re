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
      let (normalMatrix, _) = TransformAdmin.getNormalMatrixTypeArray(transform, state);
      TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
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