open BasicCameraViewCPPOType;

let getMaxIndex = () => {
  CPRepo.getBasicCameraView().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setBasicCameraView({...CPRepo.getBasicCameraView(), maxIndex});
};

let getGameObject = cameraView => {
  CPRepo.getBasicCameraView().gameObjectMap
  ->ImmutableSparseMap.get(cameraView);
};

let setGameObject = (cameraView, gameObject) => {
  let {gameObjectMap} as cameraViewPO = CPRepo.getBasicCameraView();

  CPRepo.setBasicCameraView({
    ...cameraViewPO,
    gameObjectMap:
      gameObjectMap->ImmutableSparseMap.set(cameraView, gameObject),
  });
};

let isActive = cameraView => {
  CPRepo.getBasicCameraView().isActiveMap
  ->ImmutableSparseMap.get(cameraView)
  ->OptionSt.getWithDefault(false);
};

let setAllNotActive = () => {
  let {isActiveMap} as cameraViewPO = CPRepo.getBasicCameraView();

  CPRepo.setBasicCameraView({
    ...cameraViewPO,
    isActiveMap: isActiveMap->ImmutableSparseMap.map((. value) => false),
  });
};

let setActive = (cameraView, isActive) => {
  let {isActiveMap} as cameraViewPO = CPRepo.getBasicCameraView();

  CPRepo.setBasicCameraView({
    ...cameraViewPO,
    isActiveMap: isActiveMap->ImmutableSparseMap.set(cameraView, isActive),
  });
};

let getActiveBasicCameraViews = () => {
  CPRepo.getBasicCameraView().isActiveMap
  ->ImmutableSparseMap.reducei(
      (. list, isActive, cameraView) =>
        isActive === true ? list->ListSt.push(cameraView) : list,
      [],
    )
  ->Contract.ensureCheck(
      r => {
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|only has one active cameraView at most|j},
                ~actual={j|not|j},
              ),
              () =>
              r->ListSt.length <= 1
            )
          )
        )
      },
      OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
    );
};
