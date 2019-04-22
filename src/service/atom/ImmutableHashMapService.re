let getValidKeys = map =>
  map |> Js.Dict.keys |> Js.Array.filter(value => value |> NullService.isInMap);