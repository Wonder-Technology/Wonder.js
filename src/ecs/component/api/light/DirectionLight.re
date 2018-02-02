open DirectionLightType;

open DirectionLightSystem;

let createDirectionLight = create;

let getDirectionLightGameObject = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(
    DirectionLightSystem.getMappedIndex(light, DirectionLightSystem.getMappedIndexMap(state)),
    state
  )
  |> Js.Option.getExn
};

let getDirectionLightColor = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getColor(
    DirectionLightSystem.getMappedIndex(light, DirectionLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setDirectionLightColor = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(
    DirectionLightSystem.getMappedIndex(light, DirectionLightSystem.getMappedIndexMap(state)),
    color,
    state
  )
};

let getDirectionLightIntensity = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getIntensity(
    DirectionLightSystem.getMappedIndex(light, DirectionLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setDirectionLightIntensity = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setIntensity(
    DirectionLightSystem.getMappedIndex(light, DirectionLightSystem.getMappedIndexMap(state)),
    color,
    state
  )
};