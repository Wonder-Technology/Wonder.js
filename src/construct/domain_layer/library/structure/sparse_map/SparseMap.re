open Belt.HashMap.Int;

let createEmpty = (~hintSize=10, ()): SparseMapType.t2('a) =>
  make(~hintSize);

let copy = copy;

let get = get;

let has = has;