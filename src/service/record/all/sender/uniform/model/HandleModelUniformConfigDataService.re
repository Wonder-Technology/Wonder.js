/* let _getModelMatrixNoCachableData =
     [@bs]
     (
       (transform, getLocalToWorldMatrixTypeArrayFunc, state) =>
         /* UpdateTransformMainService.updateAndGetLocalToWorldMatrixTypeArray(transform, globalTempRecord, transformRecord) */
         getLocalToWorldMatrixTypeArrayFunc(transform, state)
     );

   let _getNormalMatrixNoCachableData =
     [@bs]
     (
       (transform, getNormalMatrixTypeArrayFunc, state) => {
         let (normalMatrix, _) = getNormalMatrixTypeArrayFunc(transform, state);
         normalMatrix
       }
     ); */
let addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetTransformDataGetRenderDataService.getLocalToWorldMatrixTypeArray
    )
  | "normalMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetTransformDataGetRenderDataService.getNormalMatrixTypeArray
    )
  | "instance_mMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (
        GetTransformDataGetRenderDataService.getLocalToWorldMatrixTypeArray,
        SendGLSLDataService.sendMatrix4
      )
    )
  | "instance_normalMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (GetTransformDataGetRenderDataService.getNormalMatrixTypeArray, SendGLSLDataService.sendMatrix3)
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };