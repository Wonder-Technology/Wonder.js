open StateRenderType;

let getTexCoords = [@bs] ((index: int, {boxGeometryRecord}) => boxGeometryRecord.texCoords);