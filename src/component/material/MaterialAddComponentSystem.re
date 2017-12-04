open GameObjectType;

open MaterialType;

open MaterialStateSystem;

let handleAddComponent =
  [@bs]
  (
    (material: material, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} = getMaterialData(state);
      ComponentSystem.addComponentToGameObjectMap(material, gameObjectUid, gameObjectMap) |> ignore;
      state
    }
  );