open StateDataType;

open PointLightType;

open CreatePointLightService;

open GameObjectPointLightService;

open DisposePointLightService;

open OperatePointLightService;

let createPointLight = (state) => {
  let (pointLightRecord, index) = [@bs] CreatePointLightService.create(state.pointLightRecord);
  ({...state, pointLightRecord}, index)
};

let unsafeGetPointLightGameObject = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  unsafeGetGameObject(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let getPointLightColor = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getColor(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightColor = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let getPointLightIntensity = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getIntensity(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightIntensity = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let getPointLightConstant = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getConstant(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightConstant = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let getPointLightLinear = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getLinear(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightLinear = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let getPointLightQuadratic = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getQuadratic(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightQuadratic = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let getPointLightRange = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  getRange(
    MappedIndexService.getMappedIndex(
      light,
      IndexPointLightService.getMappedIndexMap(state.pointLightRecord)
    ),
    state.pointLightRecord
  )
};

let setPointLightRange = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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

let setPointLightRangeLevel = (light, level, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(light, isAlive, state.pointLightRecord)
          )
        )
      ),
    StateData.stateData.isDebug
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