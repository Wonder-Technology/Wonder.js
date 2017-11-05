open GameObjectType;

open MaterialType;

open MaterialStateUtils;

let handleAddComponent = (material: material, gameObjectUId: string, state: StateDataType.state) => {
  let {gameObjectMap} = getMaterialData(state);
  ComponentSystem.addComponentToGameObjectMap(material, gameObjectUId, gameObjectMap) |> ignore;
  state
};