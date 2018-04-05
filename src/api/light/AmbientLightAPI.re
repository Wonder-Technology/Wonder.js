open StateDataMainType;

open AmbientLightType;

open CreateAmbientLightService;

open GameObjectAmbientLightService;

open DisposeAmbientLightService;

open OperateAmbientLightService;

let createAmbientLight = (state) => {
  let (ambientLightRecord, index) =
    [@bs] CreateAmbientLightService.create(state.ambientLightRecord);
  ({...state, ambientLightRecord}, index)
};

let unsafeGetAmbientLightGameObject = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.ambientLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexAmbientLightService.getMappedIndexMap(state.ambientLightRecord)
    ),
    state.ambientLightRecord
  )
};

let getAmbientLightColor = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.ambientLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexAmbientLightService.getMappedIndexMap(state.ambientLightRecord)
    ),
    state.ambientLightRecord
  )
};

let setAmbientLightColor = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.ambientLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {
    ...state,
    ambientLightRecord:
      setColor(
        MappedIndexService.getMappedIndex(
          light,
          IndexAmbientLightService.getMappedIndexMap(state.ambientLightRecord)
        ),
        color,
        state.ambientLightRecord
      )
  }
};