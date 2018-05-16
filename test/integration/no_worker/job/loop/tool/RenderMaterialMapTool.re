let setSource = (mapList, state) =>
  mapList
  |> List.fold_left(
       (state, map) => {
         let source = TextureTool.buildSource(10, 20);
         state |> TextureAPI.setTextureSource(map, source)
       },
       state
     );