open MaterialType;
open StateDataType;

open GameObjectType;

open LightMaterialType;

let handleAddComponent =
  [@bs]
  (
    (material, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = LightMaterialStateCommon.getMaterialData(state);
      {
        ...state,
        lightMaterialData: {
          ...data,
          gameObjectMap:
            MaterialAddComponentCommon.handleAddComponent(material, gameObjectUid, gameObjectMap)
        }
      }
    }
  );