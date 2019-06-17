open StateRenderType;

let bindAndUpdate = ((gl, material), texture, setMapUnitFunc, state) =>
  TextureIndexService.isTextureNotDefaultValue(texture) ?
    {
      let (mapUnit, newActivedTextureUnitIndex) =
        OperateAllTextureRenderService.getActivableTextureUnit(state);

      state
      |> setMapUnitFunc(material, mapUnit)
      |> OperateAllTextureRenderService.setActivedTextureUnitIndex(
           newActivedTextureUnitIndex,
         )
      |> BindTextureRenderService.bind(gl, mapUnit, texture)
      |> UpdateTextureRenderService.handleUpdate(gl, texture);
    } :
    state;