open StateRenderType;

let bindAndUpdate =
    ((gl, material), (texture, textureType), setMapUnitFunc, state) =>
  TextureIndexService.isTextureNotDefaultValue(texture) ?
    {
      let (mapUnit, newActivedTextureUnitIndex) =
        OperateAllTextureRenderService.getActivableTextureUnit(state);

      state
      |> setMapUnitFunc(material, mapUnit)
      |> OperateAllTextureRenderService.setActivedTextureUnitIndex(
           newActivedTextureUnitIndex,
         )
      |> BindTextureRenderService.bind(gl, mapUnit, (texture, textureType))
      |> UpdateAllTextureRenderService.handleUpdate(gl, (texture, textureType));
    } :
    state;