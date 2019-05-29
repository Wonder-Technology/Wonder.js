open StateDataMainType;

let getOutlineColor = state =>
  OperateOutlineDataJobDataMainService.getColor(state);

let setOutlineColor = (color, state) =>
  OperateOutlineDataJobDataMainService.setColor(color, state);

let setGameObjectsNeedDrawOutline = (gameObjectsNeedDrawOutline, state) =>
  OperateOutlineDataJobDataMainService.setGameObjectsNeedDrawOutline(
    gameObjectsNeedDrawOutline,
    state,
  );

let setSkyboxImage =
    ((pxImage, nxImage, pyImage, nyImage, pzImage, nzImage), state) => {
  ...state,
  jobDataRecord: {
    ...state.jobDataRecord,
    skyboxData: {
      ...state.jobDataRecord.skyboxData,
      nxImage: Some(nxImage),
      pxImage: Some(pxImage),
      nyImage: Some(nyImage),
      pyImage: Some(pyImage),
      nzImage: Some(nzImage),
      pzImage: Some(pzImage),
    },
  },
};

let setSkyboxNeedUpdateCubeTexture = (needUpdateCubeTexture, state) => {
  ...state,
  jobDataRecord: {
    ...state.jobDataRecord,
    skyboxData: {
      ...state.jobDataRecord.skyboxData,
      needUpdateCubeTexture,
    },
  },
};