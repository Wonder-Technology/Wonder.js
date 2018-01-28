open LightMaterialType;

open LightMaterialSystem;

let createLightMaterial = create;

let getLightMaterialGameObject = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(material, state) |> Js.Option.getExn
};

let getLightMaterialDiffuseColor = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  unsafeGetDiffuseColor(material, state)
};

let setLightMaterialDiffuseColor = (material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setDiffuseColor(material, color, state)
};

let getLightMaterialSpecularColor = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  unsafeGetSpecularColor(material, state)
};

let setLightMaterialSpecularColor = (material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setSpecularColor(material, color, state)
};