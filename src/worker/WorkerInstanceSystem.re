open MainStateDataType;

let unsafeGetRenderWorker = (state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  state.workerInstanceData.renderWorker |> Js.Option.getExn
};

let _setRenderWorker = (state: MainStateDataType.state, worker: WorkerType.worker) => {
  ...state,
  workerInstanceData: {renderWorker: Some(worker)}
};

let _getValidFileDir = (dir: string) =>
  switch (dir |> Js.String.sliceToEnd(~from=(-1))) {
  | lastChar when lastChar !== "/" => {j|$(dir)/|j}
  | _ => dir
  };

let _getRenderWorkerFilePath = (workerFileDir: string) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|workerFileDir be defined|j},
                ~actual={j|is empty string||j}
              ),
              () => 0 |> assertGt(Int, workerFileDir |> Js.String.length)
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  (workerFileDir |> _getValidFileDir) ++ "wd.render.worker.js"
};

let _createWorker = (workerFilePath: string) => Worker.newWorker(workerFilePath);

let initWorkInstances = (workerFileDir, state: MainStateDataType.state) =>
  workerFileDir |> _getRenderWorkerFilePath |> _createWorker |> _setRenderWorker(state);