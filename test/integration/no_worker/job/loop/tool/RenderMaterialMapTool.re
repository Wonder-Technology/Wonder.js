let setSource = (mapList, state) =>
  mapList
  |> List.fold_left(
       (state, map) => {
         let source = BasicSourceTextureTool.buildSource(10, 20);
         state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map, source)
       },
       state
     );