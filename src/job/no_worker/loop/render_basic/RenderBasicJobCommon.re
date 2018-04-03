open MainStateDataType;

let render =
  [@bs]
  (
    (gl, indexTuple, state: MainStateDataType.state) =>
      /* let materialIndex =
         GetComponentGameObjectService.unsafeGetBasicMaterialComponent(uid, state.gameObjectRecord); */
      RenderJobUtils.render(
        gl,
        indexTuple,
        state
      )
  );