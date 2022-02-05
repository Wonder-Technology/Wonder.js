let addValue = (map, key, value) =>
  switch map->MutableSparseMap.get(key) {
  | None => map->MutableSparseMap.set(key, [value])
  | Some(arr) =>
    map->MutableSparseMap.set(key, arr->ArraySt.push(value))
  }
