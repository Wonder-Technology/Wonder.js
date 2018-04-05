/* let _getModelMatrixNoCachableData =
     [@bs]
     (
       (transform, getLocalToWorldMatrixTypeArrayFunc, state) =>
         /* UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(transform, globalTempRecord, transformRecord) */
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
let addModelSendData =
    (
      (field, pos, name, type_, uniformCacheMap),
      sendDataArrTuple
    ) =>
  switch field {
  | "mMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetTransformDataRenderService.getLocalToWorldMatrixTypeArray
    )
  | "normalMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetTransformDataRenderService.getNormalMatrixTypeArray
    )
  | "instance_mMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (
        GetTransformDataRenderService.getLocalToWorldMatrixTypeArray,
        SendGLSLDataService.sendMatrix4
      )
    )
  | "instance_normalMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (
        GetTransformDataRenderService.getLocalToWorldMatrixTypeArray,
        SendGLSLDataService.sendMatrix3
      )
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