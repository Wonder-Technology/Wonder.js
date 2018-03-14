open MainStateDataType;

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

let unsafeGetDirectionLightGameObject = (light, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let getDirectionLightColor = (light, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let setDirectionLightColor = (light, color, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
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

let getDirectionLightIntensity = (light, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  getIntensity(
    MappedIndexService.getMappedIndex(
      light,
      IndexDirectionLightService.getMappedIndexMap(state.directionLightRecord)
    ),
    state.directionLightRecord
  )
};

let setDirectionLightIntensity = (light, color, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
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