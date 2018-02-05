/* TODO duplicate */
open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _fillMatrixTypeArr = (uid, matricesArrayForInstance, (state, offset)) => {
  let transform = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    (TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state), 0),
    16
  )
  |> ignore;
  /* WonderLog.Log.print(matricesArrayForInstance) |> ignore; */
  let (normalMatrix, _) = TransformAdmin.getNormalMatrixTypeArray(transform, state);
  TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset + 16),
    (normalMatrix, 0),
    9
  )
  |> ignore;
  /* WonderLog.Log.print(normalMatrix) |> ignore; */
  /* WonderLog.Log.print(matricesArrayForInstance) |> ignore; */
  /* WonderLog.Log.print(TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)) |> ignore; */
  (state, offset + 16 + 9)
};

let _fillObjectInstanceData = (objectInstanceArray, matricesArrayForInstance, stateOffsetTuple) => {
  let (state, offset) =
    objectInstanceArray
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (stateOffsetTuple, objectInstance) =>
             _fillMatrixTypeArr(objectInstance, matricesArrayForInstance, stateOffsetTuple)
         ),
         stateOffsetTuple
       );
  state
};

let _sendTransformMatrixDataBuffer =
    ((gl, extension), {pos, size, getOffsetFunc}: instanceAttributeSendData, stride, index) => {
  Gl.enableVertexAttribArray(pos, gl);
  Gl.vertexAttribPointer(pos, size, Gl.getFloat(gl), Js.false_, stride, getOffsetFunc(index), gl);
  [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1)
};

let _sendTransformMatrixDataBufferData =
    (glDataTuple, shaderIndex, (stride, matricesArrayForInstance, matrixInstanceBuffer), state) => {
  let (gl, extension) = glDataTuple;
  let _ = updateData(gl, matricesArrayForInstance, matrixInstanceBuffer);
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetInstanceAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArraySystem.forEachi(
       [@bs]
       ((sendData, index) => _sendTransformMatrixDataBuffer(glDataTuple, sendData, stride, index))
     );
  state
};

let _getDefaultCapacity = () => 64 * (16 + 9) * 4;

let _sendTransformMatrixData =
    (
      (gl, extension, shaderIndex),
      (sourceUid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap),
      state
    ) => {
  let matrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      (gl, sourceInstance, _getDefaultCapacity()),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
      state
    );
  /*! instanceCount * (modelMatrixSize:4(float size) * 4(vec count) * 4(component count) + normalMatrixSize: 4 * 3 * 3) */
  /* let stride = 64; */
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateMatrixFloat32Array(
      sourceInstance,
      _getDefaultCapacity(),
      (matrixInstanceBufferCapacityMap, matrixFloat32ArrayMap),
      state
    );
  let (matrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferTypeArray(
      (gl, sourceInstance, instanceRenderListCount * 112, _getDefaultCapacity()),
      (matrixInstanceBuffer, matricesArrayForInstance),
      (matrixInstanceBufferMap, matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap),
      state
    );
  _fillMatrixTypeArr(sourceUid, matricesArrayForInstance, (state, 0))
  |> _fillObjectInstanceData(objectInstanceArray, matricesArrayForInstance)
  |> _sendTransformMatrixDataBufferData(
       (gl, extension),
       shaderIndex,
       (100, matricesArrayForInstance, matrixInstanceBuffer)
     )
};

let _sendStaticTransformMatrixData =
    (
      glDataTuple,
      (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      matrixMapTuple,
      state
    ) =>
  SourceInstanceAdmin.isSendTransformMatrixData(sourceInstance, state) ?
    state :
    state
    |> _sendTransformMatrixData(
         glDataTuple,
         (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
         matrixMapTuple
       )
    |> SourceInstanceAdmin.markIsSendTransformMatrixData(sourceInstance, true);

let _sendDynamicTransformMatrixData =
    (
      glDataTuple,
      (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      matrixMapTuple,
      state
    ) =>
  state
  |> SourceInstanceAdmin.markIsSendTransformMatrixData(sourceInstance, false)
  |> _sendTransformMatrixData(
       glDataTuple,
       (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
       matrixMapTuple
     );

let _geMatrixMapTuple = (state) => {
  let {matrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} =
    SourceInstanceAdmin.getSourceInstanceData(state);
  (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
};

let render = (gl, uid, state: StateDataType.state) => {
  /* TODO optimize for static data:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, geometryIndex) = state |> FrontRenderLightJobCommon.render(gl, uid);
  let extension =
    GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays |> Js.Option.getExn;
  let sourceInstance = GameObjectGetComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
  let glDataTuple = (gl, extension, shaderIndex);
  let instanceDataTuple = (uid, sourceInstance, objectInstanceArray, instanceRenderListCount);
  let matrixMapTuple = _geMatrixMapTuple(state);
  let state =
    SourceInstanceAdmin.isTransformStatic(sourceInstance, state) ?
      _sendStaticTransformMatrixData(glDataTuple, instanceDataTuple, matrixMapTuple, state) :
      _sendDynamicTransformMatrixData(glDataTuple, instanceDataTuple, matrixMapTuple, state);
  GLSLSenderDrawUtils.drawElementsInstancedANGLE(
    (
      GeometryAdmin.getDrawMode(gl),
      GeometryAdmin.getIndexType(gl),
      GeometryAdmin.getIndexTypeSize(gl),
      GeometryAdmin.getIndicesCount(geometryIndex, state),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* TODO unbind? */
  state
};