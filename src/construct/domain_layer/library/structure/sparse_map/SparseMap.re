let createEmpty = (~hintSize=10, ()): SparseMapType.t2('a) => [||];

let copy = Js.Array.copy;

let unsafeGet = (map: SparseMapType.t2('a), key: int): 'a =>
  Array.unsafe_get(map, key)->SparseMapType.nullableToNotNullable;

let get = (map, key: int) => {
  let value = unsafeGet(map, key);

  NullUtils.isEmpty(value) ? None : Some(value);
};

let getNullable = (map, key) => {
  get(map, key)->Js.Nullable.fromOption;
};

let has = (map, key: int) => !NullUtils.isEmpty(unsafeGet(map, key));
