let createEmptyMap = componentCount => {
  ImmutableSparseMap.createEmpty(~hintSize=componentCount, ());
};
