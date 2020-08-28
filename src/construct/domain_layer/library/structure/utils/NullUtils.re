let isEmpty = value =>
  value === Obj.magic(Js.Nullable.null)
  || value === Obj.magic(Js.Nullable.undefined);
