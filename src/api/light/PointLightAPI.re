open MainStateDataType;

open PointLightType;

open CreatePointLightService;

open GameObjectPointLightService;

open DisposePointLightService;

open OperatePointLightService;

let createPointLight = (state) => {
  let (pointLightRecord, index) = [@bs] CreatePointLightService.create(state.pointLightRecord);
  ({...state, pointLightRecord}, index)
};

let unsafeGetPointLightGameObject = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let getPointLightColor = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightColor = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setColor(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let getPointLightIntensity = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getIntensity(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightIntensity = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setIntensity(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let getPointLightConstant = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getConstant(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightConstant = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setConstant(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let getPointLightLinear = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getLinear(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightLinear = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setLinear(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let getPointLightQuadratic = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getQuadratic(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightQuadratic = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setQuadratic(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let getPointLightRange = (light, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  getRange(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightRange = (light, color, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setRange(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        color,
        state.pointLightRecord
      )
  }
};

let setPointLightRangeLevel = (light, level, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  {
    ...state,
    pointLightRecord:
      setRangeLevel(
        MappedIndexService.getMappedIndex(
          light,
          IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
        ),
        level,
        state.pointLightRecord
      )
  }
};