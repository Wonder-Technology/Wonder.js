open WorkerInstanceType;

let unsafeGetRenderWorker = ({renderWorker}) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render worker exist|j}, ~actual={j|not|j}),
              () => renderWorker |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  renderWorker |> OptionService.unsafeGet
};

let _setRenderWorker = (record, worker: WorkerType.worker) => {renderWorker: Some(worker)};

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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  (workerFileDir |> _getValidFileDir) ++ "wd.render.worker.js"
};

let _createWorker = (workerFilePath: string) => Worker.newWorker(workerFilePath);

let initWorkInstances = (workerFileDir, record) =>
  workerFileDir |> _getRenderWorkerFilePath |> _createWorker |> _setRenderWorker(record);