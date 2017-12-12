open ObjectInstanceType;

open ObjectInstanceStateCommon;

let handleAddComponent =
  [@bs]
  ((objectInstance: objectInstance, gameObjectUid: int, state: StateDataType.state) => state);