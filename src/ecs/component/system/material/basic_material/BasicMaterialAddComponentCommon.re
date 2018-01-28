open MaterialType;

open StateDataType;

open GameObjectType;

open BasicMaterialType;

let handleAddComponent =
  [@bs]
  (
    (material, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = BasicMaterialStateCommon.getMaterialData(state);
      {
        ...state,
        basicMaterialData: {
          ...data,
          gameObjectMap:
            MaterialAddComponentCommon.handleAddComponent(material, gameObjectUid, gameObjectMap)
        }
      }
    }
  );