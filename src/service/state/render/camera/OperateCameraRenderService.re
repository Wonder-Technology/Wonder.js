open StateRenderType;

let getCameraVMatrixData = [@bs] ((state) => state.cameraRecord.vMatrix);

let getCameraPMatrixData = [@bs] ((state) => state.cameraRecord.pMatrix);

let getCameraPositionData = [@bs] ((state) => state.cameraRecord.position);