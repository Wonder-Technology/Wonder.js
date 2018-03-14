open MainStateDataType;

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

let unsafeGetAmbientLightGameObject = (light, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexAmbientLightService.getMappedIndexMap(state.ambientLightRecord)
    ),
    state.ambientLightRecord
  )
};

let getAmbientLightColor = (light, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexAmbientLightService.getMappedIndexMap(state.ambientLightRecord)
    ),
    state.ambientLightRecord
  )
};

let setAmbientLightColor = (light, color, state: MainStateDataType.state) => {
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
    MainStateData.stateData.isDebug
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