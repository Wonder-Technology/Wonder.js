open StateDataMainType;

let getColor = state => OperateOutlineDataJobDataMainService.getColor(state);

let setColor = (color, state) =>
  OperateOutlineDataJobDataMainService.setColor(color, state);

let getGameObjectsNeedDrawOutline = state =>
  OperateOutlineDataJobDataMainService.getGameObjectsNeedDrawOutline(state);

let setGameObjectsNeedDrawOutline = (gameObjectsNeedDrawOutline, state) =>
  OperateOutlineDataJobDataMainService.setGameObjectsNeedDrawOutline(
    gameObjectsNeedDrawOutline,
    state,
  );