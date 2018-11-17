let isUndefined = value => value |> Obj.magic === Js.Undefined.empty;

let isNotEqual = (value1, value2) => value1 != value2;