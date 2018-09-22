let getAllComponents = (index, disposedIndexArray) =>
  ArrayService.range(0, index - 1)
  |> Js.Array.filter(index =>
       ! (disposedIndexArray |> Js.Array.includes(index))
     );