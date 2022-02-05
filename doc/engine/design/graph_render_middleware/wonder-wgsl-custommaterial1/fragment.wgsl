struct Object{
materialIndex:u32;
materialType:string;
// geometryIndex:u32;
}


struct Instance{
modelMatrix;
// aabb;
}

// [[group(1), binding(0)]] var<storage, read> objectsBuffer: objectsBuffer[baseIndex];

// [[group(1), binding(0)]] var<storage, read> instancesBuffer: instancesBuffer[gl_instanceID];

// [[group(1), binding(0)]] var<storage, read> pbrMaterialsBuffer: pbrMaterialsBuffer[materialIndex];