let getAllAliveMaterials = (index, disposedIndexArray) =>
  ArrayService.range(0, index - 1)
  |> Js.Array.filter(material =>
       DisposeMaterialMainService.isAlive(material, disposedIndexArray)
     );