open RenderWorkerCustomType;

let create = () => {
  customDataFromMainWorkerToRenderWorker: Obj.magic(-1),
  customDataFromRenderWorkerToMainWorker: Obj.magic(-1),
};