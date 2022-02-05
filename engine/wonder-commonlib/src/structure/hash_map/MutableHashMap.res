type t<'key, 'value> = HashMapType.t<'key, 'value>

let createEmpty = HashMap.createEmpty

let set = (map: HashMapType.t2<'a>, key: string, value: 'a) => {
  Js.Dict.set(map, key, value->HashMapType.notNullableToNullable)

  map
}

let unsafeGet = HashMap.unsafeGet

let get = HashMap.get

let getNullable = HashMap.getNullable

let has = HashMap.has

let deleteVal = (map: HashMapType.t2<'a>, key: string) => {
  Js.Dict.set(map, key, Js.Nullable.undefined)

  map
}

let getValidValues = HashMap.getValidValues

let copy = HashMap.copy
