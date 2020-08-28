type t('key, 'value) = HashMapType.t('key, 'value);

let createEmpty = HashMap.createEmpty;

let set =
    (map: HashMapType.t2('a), key: string, value: 'a): HashMapType.t2('a) => {
  let newMap = map->HashMap.copy;

  Js.Dict.set(newMap, key, value->HashMapType.notNullableToNullable);

  newMap;
};

let get = HashMap.get;

let getNullable = HashMap.getNullable;

let has = HashMap.has;
