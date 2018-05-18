let setSource = (mapList, state) =>
  mapList
  |> List.fold_left(
       (state, map) => {
         let source = TextureTool.buildSource(10, 20);
         state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map, source)
       },
       state
     );