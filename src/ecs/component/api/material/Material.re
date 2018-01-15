open MaterialSystem;

open MaterialType;

let getMaterialGameObject = (material: material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(material, state) |> Js.Option.getExn
};

let getMaterialColor = (material: material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  unsafeGetColor(material, state)
};

let setMaterialColor = (material: material, color, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setColor(material, color, state)
};