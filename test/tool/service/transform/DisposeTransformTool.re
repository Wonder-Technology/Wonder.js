open StateDataMainType;

open TransformType;

open DisposeTransformMainService;

let handleDisposeComponent =
    (transform: transform, maxTypeArrayPoolSize, isKeepOrder, {settingRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let transformRecord =
    _disposeData(
      transform,
      (
        BufferSettingService.getTransformDataBufferCount(settingRecord),
        maxTypeArrayPoolSize,
        isKeepOrder
      ),
      state |> RecordTransformMainService.getRecord
    );
  let {disposedIndexArray} = transformRecord;
  state.transformRecord =
    Some({
      ...transformRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(transform)
    });
  state
};