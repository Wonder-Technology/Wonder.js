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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
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