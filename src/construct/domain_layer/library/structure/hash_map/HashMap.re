open Belt.HashMap.String;

let createEmpty = (~hintSize=10, ()): HashMapType.t2('a) => make(~hintSize);

let get = (map: HashMapType.t2('a), key: string) => get(map, key);

let getNullable = (map: HashMapType.t2('a), key: string) =>
  get(map, key)->Js.Nullable.fromOption;

// let entries = (map: HashMapType.t2('a)): array((Js.Dict.key, 'a)) =>
//   map |> Js.Dict.entries;

// let _mutableSet = (key: string, value, map) => {
//   Js.Dict.set(map, key, value);
//   map;
// };

// let _createEmpty = (): Js.Dict.t('a) => Js.Dict.empty();

let copy = (map: HashMapType.t2('a)): HashMapType.t2('a) => copy(map);

// map
// |> entries
// |> ArrayContainerDoService.reduceOneParam(
//      (. newMap, (key, value)) => newMap |> _mutableSet(key, value),
//      _createEmpty(),
//    );
