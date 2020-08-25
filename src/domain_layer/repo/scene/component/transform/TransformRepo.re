open TransformPOType;

let getMaxIndex = () => {
  Repo.getTransform().maxIndex;
};

let setMaxIndex = maxIndex => {
  Repo.setTransform({...Repo.getTransform(), maxIndex});
};

let setChildrenByIndex = (index, children) => {
  let {childrenMap} as transformPO = Repo.getTransform();

  Repo.setTransform({
    ...transformPO,
    childrenMap: childrenMap->ImmutableSparseMap.set(index, children),
  });
};

let setIsDirtyByIndex = (index, isDirty) => {
  let {dirtyMap} as transformPO = Repo.getTransform();

  Repo.getTransform({
    ...transformPO,
    dirtyMap: dirtyMap->ImmutableSparseMap.set(index, isDirty),
  });
};
