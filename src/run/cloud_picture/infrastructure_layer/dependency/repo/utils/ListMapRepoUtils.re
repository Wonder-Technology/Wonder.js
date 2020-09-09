let addValue = (map, key, value) => {
  switch (map->ImmutableSparseMap.get(key)) {
  | None => map->ImmutableSparseMap.set(key, [value])
  | Some(list) => map->ImmutableSparseMap.set(key, [value, ...list])
  };
};
