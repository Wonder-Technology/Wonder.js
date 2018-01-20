open StateDataType;

let unsafeGetRenderWorker = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render worker exist|j}, ~actual={j|not|j}),
              () => state.workerInstanceData.renderWorker |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.workerInstanceData.renderWorker |> Js.Option.getExn
};

let _setRenderWorker = (state: StateDataType.state, worker: WorkerType.worker) => {
  ...state,
  workerInstanceData: {renderWorker: Some(worker)}
};

/* var _getValidFileDir = (dir: string) => {
       if (dir.slice(-1) !== '/') {
           return `${dir}/`;
       }

       return dir;
   } */
/* let _getRenderWorkerFilePath = () => "/Wonder.js/dist/wd.render.worker.js"; */
let _getRenderWorkerFilePath = () => "../dist/wd.render.worker.js";

/* return `${_getValidFileDir(WorkerDetectData.renderWorkerFileDir)}wd.renderWorker.js` */
let _createWorker = (workerFilePath: string) => Worker.newWorker(workerFilePath);

let initWorkInstances = (state: StateDataType.state) =>
  _getRenderWorkerFilePath() |> _createWorker |> _setRenderWorker(state);