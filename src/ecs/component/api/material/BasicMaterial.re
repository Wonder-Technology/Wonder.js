open BasicMaterialType;

open BasicMaterialSystem;

let createBasicMaterial = create;

let getBasicMaterialGameObject = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(material, state) |> Js.Option.getExn
};

let getBasicMaterialColor = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  unsafeGetColor(material, state)
};

let setBasicMaterialColor = (material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(material, color, state)
};