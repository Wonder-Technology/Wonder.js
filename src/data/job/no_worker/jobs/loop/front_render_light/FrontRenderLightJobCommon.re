open StateDataType;

let render =
  [@bs]
  (
    (gl, uid, state: StateDataType.state) => {
      let materialIndex =
        GetComponentGameObjectService.unsafeGetLightMaterialComponent(uid, state.gameObjectRecord);
      RenderJobUtils.render(
        gl,
        (
          materialIndex,
          ShaderIndexLightMaterialMainService.unsafeGetShaderIndex(materialIndex, state),
          uid
        ),
        state
      )
    }
  );