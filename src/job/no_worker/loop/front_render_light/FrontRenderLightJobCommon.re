open MainStateDataType;

let render =
  [@bs]
  (
    (gl, uid, state: MainStateDataType.state) => {
      let materialIndex =
        GetComponentGameObjectService.unsafeGetLightMaterialComponent(uid, state.gameObjectRecord);
      RenderJobUtils.render(
        gl,
        (
          materialIndex,
          ShaderIndexLightMaterialMainService.getShaderIndex(materialIndex, state),
          uid
        ),
        state
      )
    }
  );