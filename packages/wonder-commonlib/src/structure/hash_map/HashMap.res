let createEmpty = (~hintSize=10, ()): HashMapType.t2<'a> => Js.Dict.empty()

let unsafeGet = (map, key: string) => Js.Dict.unsafeGet(map, key)->HashMapType.nullableToNotNullable

let get = (map, key: string) => {
  let value = unsafeGet(map, key)

  NullUtils.isEmpty(value) ? None : Some(value)
}

let getNullable = (map: HashMapType.t2<'a>, key: string) => get(map, key)->Js.Nullable.fromOption

let has = (map, key: string) => !NullUtils.isEmpty(unsafeGet(map, key))

let entries = (map: HashMapType.t<Js.Dict.key, 'a>): array<(Js.Dict.key, 'a)> =>
  map->Js.Dict.entries->HashMapType.entriesNullableToEntriesNotNullable

let _mutableSet = (map, key: string, value) => {
  Js.Dict.set(map, key, value)
  map
}

let _createEmpty = (): Js.Dict.t<'a> => Js.Dict.empty()

let copy = (map: Js.Dict.t<Js.Nullable.t<'a>>): Js.Dict.t<Js.Nullable.t<'a>> =>
  map
  ->entries
  ->ArraySt.reduceOneParam(
    (. newMap, (key, value)) => newMap->_mutableSet(key, value),
    _createEmpty(),
  )
  ->HashMapType.dictNotNullableToDictNullable

// let copy = (map: HashMapType.t2('a)): HashMapType.t2('a) =>
//   map
//   ->entries
//   ->ArraySt.reduceOneParam(
//       (. newMap, (key, value)) => newMap->_mutableSet(key, value),
//       createEmpty(),
//     );
// // ->HashMapType.dictNotNullableToDictNullable;

let getValidValues = map =>
  map
  ->Js.Dict.values
  ->Js.Array.filter(value => value->NullUtils.isInMap, _)
  ->SparseMapType.arrayNullableToArrayNotNullable
