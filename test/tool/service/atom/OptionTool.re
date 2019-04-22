let unsafeGet = OptionService.unsafeGet;

let buildJsonSerializedValueNone = () => Js.Nullable.null |> Obj.magic;