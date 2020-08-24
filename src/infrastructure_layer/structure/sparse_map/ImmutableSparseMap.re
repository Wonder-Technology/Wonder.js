type t('index, 'value) = SparseMapType.t('index, 'value);

let createEmpty = SparseMap.createEmpty;

let copy = SparseMap.copy;

let get = SparseMap.get;

let has = SparseMap.has;

let set = Belt.HashMap.Int.set;