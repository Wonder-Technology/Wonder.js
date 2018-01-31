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
  getGameObject(light, state) |> Js.Option.getExn
};

let getAmbientLightColor = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getColor(light, state)
};

let setAmbientLightColor = (light, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(light, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(light, color, state)
};