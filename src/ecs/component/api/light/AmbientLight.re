open AmbientLightType;

open AmbientLightSystem;

let createAmbientLight = create;

let getAmbientLightGameObject = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(
    AmbientLightSystem.getMappedIndex(light, AmbientLightSystem.getMappedIndexMap(state)),
    state
  )
  |> Js.Option.getExn
};

let getAmbientLightColor = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getColor(
    AmbientLightSystem.getMappedIndex(light, AmbientLightSystem.getMappedIndexMap(state)),
    state
  )
};

let setAmbientLightColor = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(
    AmbientLightSystem.getMappedIndex(light, AmbientLightSystem.getMappedIndexMap(state)),
    color,
    state
  )
};