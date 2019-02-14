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