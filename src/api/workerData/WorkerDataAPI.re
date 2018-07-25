let getRenderWorkerCustomData = state =>
  OperateWorkerDataMainService.getRenderWorkerCustomData(state);

let getMainWorkerCustomData = state =>
  OperateWorkerDataMainService.getMainWorkerCustomData(state);

let setMainWorkerCustomData = (customData, state) =>
  OperateWorkerDataMainService.setMainWorkerCustomData(customData, state);