open RenderWorkerCustomType;

let create = () => {
  customDataInRenderWorker: Obj.magic(-1),
  customDataFromMainWorkerToRenderWorker: Obj.magic(-1),
  customDataFromRenderWorkerToMainWorker: Obj.magic(-1),
};