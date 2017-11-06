open MaterialSystem;

open MaterialType;

let getMaterialGameObject = (material: material, state: StateDataType.state) =>
  getGameObject(material, state) |> Js.Option.getExn;