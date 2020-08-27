type t('key, 'value) = HashMapType.t('key, 'value);

let createEmpty = HashMap.createEmpty;

let set = Belt.HashMap.String.set;

let get = HashMap.get;

let getNullable = HashMap.getNullable;