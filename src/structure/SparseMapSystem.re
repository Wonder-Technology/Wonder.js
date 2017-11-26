let createEmpty = () => [||];

let unsafeGet = (key: int, map) => Array.unsafe_get(map, key);

let get = (key: int, map) => {
  let value = unsafeGet(key, map);
  value === Obj.magic(Js.Nullable.empty) ? None : Some(value)
};

let has = (key: int, map) => unsafeGet(key, map) != Obj.magic(Js.Nullable.empty);

let set = (key: int, value, map) => Array.unsafe_set(map, key, value);

let deleteVal = (key: int, map) => Array.unsafe_set(map, key, Js.Undefined.empty);