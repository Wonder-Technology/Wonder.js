open TransformCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnTransform().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setTransform({...CPRepo.getExnTransform(), maxIndex});
};

let getGameObject = transform => {
  CPRepo.getExnTransform().gameObjectMap
  ->ImmutableSparseMap.getNullable(transform);
};

let setGameObject = (transform, gameObject) => {
  let {gameObjectMap} as transformPO = CPRepo.getExnTransform();

  CPRepo.setTransform({
    ...transformPO,
    gameObjectMap:
      gameObjectMap->ImmutableSparseMap.set(transform, gameObject),
  });
};

let getParent = transform => {
  CPRepo.getExnTransform().parentMap
  ->ImmutableSparseMap.getNullable(transform);
};

let setParent = (parent, child) => {
  let {parentMap} as transformPO = CPRepo.getExnTransform();

  CPRepo.setTransform({
    ...transformPO,
    parentMap: parentMap->ImmutableSparseMap.set(parent, child),
  });
};

let hasParent = transform => {
  CPRepo.getExnTransform().parentMap->ImmutableSparseMap.has(transform);
};

let removeParent = transform => {
  let {parentMap} as transformPO = CPRepo.getExnTransform();

  CPRepo.setTransform({
    ...transformPO,
    parentMap: parentMap->ImmutableSparseMap.remove(transform),
  });
};

let getChildren = transform => {
  CPRepo.getExnTransform().childrenMap
  ->ImmutableSparseMap.getNullable(transform);
};

let setChildren = (parent, children) => {
  let {childrenMap} as transformPO = CPRepo.getExnTransform();

  CPRepo.setTransform({
    ...transformPO,
    childrenMap: childrenMap->ImmutableSparseMap.set(parent, children),
  });
};

let addChild = (parent, child) => {
  let {childrenMap} as transformPO = CPRepo.getExnTransform();

  let children =
    switch (childrenMap->ImmutableSparseMap.get(parent)) {
    | None => []
    | Some(children) => children
    };

  CPRepo.setTransform({
    ...transformPO,
    childrenMap:
      childrenMap->ImmutableSparseMap.set(parent, [child, ...children]),
  });
};

let removeChild = (parent, child) => {
  let {childrenMap} as transformPO = CPRepo.getExnTransform();

  switch (childrenMap->ImmutableSparseMap.get(parent)) {
  | None => ()
  | Some(children) =>
    CPRepo.setTransform({
      ...transformPO,
      childrenMap:
        childrenMap->ImmutableSparseMap.set(
          parent,
          children->ListSt.remove(child),
        ),
    })
  };
};

let getIsDirty = transform => {
  CPRepo.getExnTransform().dirtyMap
  ->ImmutableSparseMap.getNullable(transform);
};

let setIsDirty = (transform, isDirty) => {
  let {dirtyMap} as transformPO = CPRepo.getExnTransform();

  CPRepo.setTransform({
    ...transformPO,
    dirtyMap: dirtyMap->ImmutableSparseMap.set(transform, isDirty),
  });
};

let getLocalToWorldMatrix = transform => {
  OperateTypeArrayTransformCPRepoUtils.getLocalToWorldMatrixTypeArray(
    transform,
    CPRepo.getExnTransform().localToWorldMatrices,
  );
};

let getLocalPosition = transform => {
  OperateTypeArrayTransformCPRepoUtils.getLocalPositionTuple(
    transform,
    CPRepo.getExnTransform().localPositions,
  );
};

let setLocalPosition = (transform, position) => {
  OperateTypeArrayTransformCPRepoUtils.setLocalPosition(
    transform,
    position,
    CPRepo.getExnTransform().localPositions,
  );
};

let getLocalRotation = transform => {
  OperateTypeArrayTransformCPRepoUtils.getLocalRotationTuple(
    transform,
    CPRepo.getExnTransform().localRotations,
  );
};

let setLocalRotation = (transform, rotation) => {
  OperateTypeArrayTransformCPRepoUtils.setLocalRotation(
    transform,
    rotation,
    CPRepo.getExnTransform().localRotations,
  );
};

let getLocalScale = transform => {
  OperateTypeArrayTransformCPRepoUtils.getLocalScaleTuple(
    transform,
    CPRepo.getExnTransform().localScales,
  );
};

let setLocalScale = (transform, scale) => {
  OperateTypeArrayTransformCPRepoUtils.setLocalScale(
    transform,
    scale,
    CPRepo.getExnTransform().localScales,
  );
};
