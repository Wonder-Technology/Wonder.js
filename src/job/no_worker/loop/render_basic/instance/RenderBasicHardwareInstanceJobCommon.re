open MainStateDataType;

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
      (state, offset + 16)
    }
  );

let render = (gl, uid, state: MainStateDataType.state) =>
  RenderHardwareInstanceJobUtils.render(
    gl,
    (uid, 64 * 16 * 4, 64, 64),
    (RenderBasicJobCommon.render, _fillMatrixTypeArr),
    state
  );