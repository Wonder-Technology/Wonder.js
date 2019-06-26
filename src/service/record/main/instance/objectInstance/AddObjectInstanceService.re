open AllInstanceType;

open ObjectInstanceType;

let handleAddComponent =
  [@bs]
  ((objectInstance: objectInstance, gameObjectUid: int, record: objectInstanceRecord) => record);