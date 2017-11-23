open GameObjectType;

open MaterialType;

open MaterialStateUtils;

let handleAddComponent = (material: material, gameObjectUid: string, state: StateDataType.state) => {
  let {gameObjectMap} = getMaterialData(state);
  ComponentSystem.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap) |> ignore;
  state
};