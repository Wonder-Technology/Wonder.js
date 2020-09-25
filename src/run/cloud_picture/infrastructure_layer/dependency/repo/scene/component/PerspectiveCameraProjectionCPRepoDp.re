open PerspectiveCameraProjectionCPPOType;

let getMaxIndex = () => {
  CPRepo.getPerspectiveCameraProjection().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setPerspectiveCameraProjection({
    ...CPRepo.getPerspectiveCameraProjection(),
    maxIndex,
  });
};

let getGameObject = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().gameObjectMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setGameObject = (cameraProjection, gameObject) => {
  let {gameObjectMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    gameObjectMap:
      gameObjectMap->ImmutableSparseMap.set(cameraProjection, gameObject),
  });
};

let getPMatrix = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().pMatrixMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setPMatrix = (cameraProjection, pMatrix) => {
  let {pMatrixMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    pMatrixMap: pMatrixMap->ImmutableSparseMap.set(cameraProjection, pMatrix),
  });
};

let getFovy = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().fovyMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setFovy = (cameraProjection, fovy) => {
  let {fovyMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    fovyMap: fovyMap->ImmutableSparseMap.set(cameraProjection, fovy),
  });
};

let getAspect = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().aspectMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setAspect = (cameraProjection, aspect) => {
  let {aspectMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    aspectMap: aspectMap->ImmutableSparseMap.set(cameraProjection, aspect),
  });
};

let getNear = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().nearMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setNear = (cameraProjection, near) => {
  let {nearMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    nearMap: nearMap->ImmutableSparseMap.set(cameraProjection, near),
  });
};

let getFar = cameraProjection => {
  CPRepo.getPerspectiveCameraProjection().farMap
  ->ImmutableSparseMap.get(cameraProjection);
};

let setFar = (cameraProjection, far) => {
  let {farMap} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    farMap: farMap->ImmutableSparseMap.set(cameraProjection, far),
  });
};

let _mark = (cameraProjection, operateDirtyArrayFunc) => {
  let {dirtyList} as cameraProjectionPO =
    CPRepo.getPerspectiveCameraProjection();

  CPRepo.setPerspectiveCameraProjection({
    ...cameraProjectionPO,
    dirtyList: dirtyList->operateDirtyArrayFunc(cameraProjection),
  });
};

let markDirty = cameraProjection => {
  _mark(cameraProjection, DirtyListRepoUtils.addToDirtyList);
};

let markNotDirty = cameraProjection => {
  _mark(cameraProjection, DirtyListRepoUtils.removeFromDirtyList);
};

let addToDirtyList = cameraProjection => markDirty(cameraProjection);

let getDirtyList = () => CPRepo.getPerspectiveCameraProjection().dirtyList;

let clearDirtyList = () => {
  CPRepo.setPerspectiveCameraProjection({
    ...CPRepo.getPerspectiveCameraProjection(),
    dirtyList: DirtyListRepoUtils.create(),
  });
};
