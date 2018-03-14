open StateDataType;

let render =
  [@bs]
  (
    (gl, uid, state: StateDataType.state) => {
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