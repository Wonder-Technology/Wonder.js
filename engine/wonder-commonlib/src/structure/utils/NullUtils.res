let isEmpty = value =>
  value === Obj.magic(Js.Nullable.null) || value === Obj.magic(Js.Nullable.undefined)

let isNotInMap = value => value === Js.Nullable.undefined

let isInMap = value => value !== Js.Nullable.undefined
