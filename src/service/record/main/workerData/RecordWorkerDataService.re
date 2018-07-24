open WorkerDataType;

let hasRenderWorkerCustomData = ({renderWorkerData}) =>
  Obj.magic(renderWorkerData.customDataFromRenderWorkerToMainWorker) !== (-1);

let create = () => {
  renderWorkerData: {
    customDataFromRenderWorkerToMainWorker: Obj.magic(-1),
  },
};