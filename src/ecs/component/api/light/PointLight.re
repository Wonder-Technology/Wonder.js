open PointLightType;

open PointLightSystem;

let createPointLight = create;

let getPointLightGameObject = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
  |> Js.Option.getExn
};

let getPointLightColor = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getColor(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightColor = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    color,
    state
  )
};

let getPointLightIntensity = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getIntensity(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightIntensity = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setIntensity(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    color,
    state
  )
};

let getPointLightConstant = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getConstant(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightConstant = (light, constant, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setConstant(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    constant,
    state
  )
};

let getPointLightLinear = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getLinear(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightLinear = (light, linear, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setLinear(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    linear,
    state
  )
};

let getPointLightQuadratic = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getQuadratic(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightQuadratic = (light, quadratic, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setQuadratic(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    quadratic,
    state
  )
};

let getPointLightRange = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getRange(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setPointLightRange = (light, range, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setRange(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    range,
    state
  )
};

let setPointLightRangeLevel = (light, level, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setRangeLevel(
    PointLightSystem.getMappedIndex(light, PointLightSystem.getMappedIndexMap(state)),
    level,
    state
  )
};