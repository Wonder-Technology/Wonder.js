open MaterialSystem;

open MaterialType;

open Contract;

let getMaterialGameObject = (material: material, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(material, isAlive, state))
  );
  getGameObject(material, state) |> Js.Option.getExn
};