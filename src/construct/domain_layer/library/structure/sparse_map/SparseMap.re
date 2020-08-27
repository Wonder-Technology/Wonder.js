open Belt.HashMap.Int;

let createEmpty = (~hintSize=10, ()): SparseMapType.t2('a) =>
  make(~hintSize);

let copy = copy;

let get = get;

let getNullable = (map, key) => get(map, key)->Js.Nullable.fromOption;

let has = has;
