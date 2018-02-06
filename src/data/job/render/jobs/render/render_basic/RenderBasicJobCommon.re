let render =
  [@bs]
  (
    (gl, uid, state: StateDataType.state) => {
      let materialIndex = GameObjectAdmin.unsafeGetBasicMaterialComponent(uid, state);
      RenderJobUtils.render(
        gl,
        (materialIndex, BasicMaterialAdmin.unsafeGetShaderIndex(materialIndex, state), uid),
        state
      )
    }
  );