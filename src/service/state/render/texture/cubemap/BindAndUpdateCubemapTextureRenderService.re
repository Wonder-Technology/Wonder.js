open StateRenderType;

let bindAndUpdate = (gl, texture, state) => {
  let textureType = TextureType.Cubemap;

  let (mapUnit, newActivedTextureUnitIndex) =
    OperateAllTextureRenderService.getActivableTextureUnit(state);

  state
  |> OperateAllTextureRenderService.setActivedTextureUnitIndex(
       newActivedTextureUnitIndex,
     )
  |> BindTextureRenderService.bind(gl, mapUnit, (texture, textureType))
  |> UpdateAllTextureRenderService.handleUpdate(gl, (texture, textureType));
};