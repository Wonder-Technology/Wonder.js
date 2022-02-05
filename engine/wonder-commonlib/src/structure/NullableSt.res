external unsafeGet: Js.Nullable.t<'a> => 'a = "%identity"

let return = data => data->Js.Nullable.return
