open StateDataMainType;

open LightMaterialType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordLightMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord
      ),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};