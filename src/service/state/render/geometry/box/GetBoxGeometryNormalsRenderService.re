open StateRenderType;

let getNormals = [@bs] ((index:int, {boxGeometryRecord}) => boxGeometryRecord.normals);
