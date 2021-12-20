type t<'index, 'value> = SparseMapType.t<'index, 'value>

let createEmpty = SparseMap.createEmpty

let copy = SparseMap.copy

let unsafeGet = SparseMap.unsafeGet

let get = SparseMap.get

let getNullable = SparseMap.getNullable

let has = SparseMap.has

let set = (map: SparseMapType.t2<'a>, key: int, value: 'a): SparseMapType.t2<'a> => {
  Array.unsafe_set(map, key, value->SparseMapType.notNullableToNullable)

  map
}

let remove = (map, key: int) => {
  Array.unsafe_set(map, key, Js.Nullable.undefined)

  map
}

let map = SparseMap.map

let reducei = SparseMap.reducei

let getValues = SparseMap.getValues

let getKeys = SparseMap.getKeys

let deleteVal = (map, key: int) => {
  Array.unsafe_set(map, key, Js.Nullable.undefined)

  map
}
