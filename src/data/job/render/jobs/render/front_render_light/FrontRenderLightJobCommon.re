let render = (gl, uid, state: StateDataType.state) => {
  let materialIndex = GameObjectAdmin.unsafeGetLightMaterialComponent(uid, state);
  RenderJobUtils.render(
    gl,
    (materialIndex, LightMaterialAdmin.unsafeGetShaderIndex(materialIndex, state), uid),
    state
  )
};