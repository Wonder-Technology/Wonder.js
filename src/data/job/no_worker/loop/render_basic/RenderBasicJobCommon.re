open MainStateDataType;

let render =
  [@bs]
  (
    (gl, uid, state: MainStateDataType.state) => {
      let materialIndex =
        GetComponentGameObjectService.unsafeGetBasicMaterialComponent(uid, state.gameObjectRecord);
      RenderJobUtils.render(
        gl,
        (
          materialIndex,
          ShaderIndexBasicMaterialMainService.unsafeGetShaderIndex(materialIndex, state),
          uid
        ),
        state
      )
    }
  );