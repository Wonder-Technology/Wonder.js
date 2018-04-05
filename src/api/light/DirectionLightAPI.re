open StateDataMainType;

open DirectionLightType;

open CreateDirectionLightService;

open GameObjectDirectionLightService;

open DisposeDirectionLightService;

open OperateDirectionLightService;

let createDirectionLight = (state) => {
  let (directionLightRecord, index) =
    [@bs] CreateDirectionLightService.create(state.directionLightRecord);
  ({...state, directionLightRecord}, index)
};

let unsafeGetDirectionLightGameObject = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.directionLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let getDirectionLightColor = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.directionLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let setDirectionLightColor = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.directionLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {
    ...state,
    directionLightRecord:
      setColor(
        MappedIndexService.getMappedIndex(
          light,
          IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
        ),
        color,
        state.directionLightRecord
      )
  }
};

let getDirectionLightIntensity = (light, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.directionLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getIntensity(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let setDirectionLightIntensity = (light, color, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              light,
              isAlive,
              state.directionLightRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {
    ...state,
    directionLightRecord:
      setIntensity(
        MappedIndexService.getMappedIndex(
          light,
          IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
        ),
        color,
        state.directionLightRecord
      )
  }
};