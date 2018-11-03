let removeFromRenderLightArr = (mappedIndex, renderLightArr) =>
  renderLightArr
  |> Js.Array.filter(renderMappedIndex => renderMappedIndex !== mappedIndex);