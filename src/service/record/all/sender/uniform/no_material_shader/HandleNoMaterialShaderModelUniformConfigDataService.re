let addModelSendData =
    ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch (field) {
  | "mMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetTransformDataGetRenderDataService.getLocalToWorldMatrixTypeArray,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let addExpandModelSendData =
    ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch (field) {
  | "mMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      GetOutlineDataTransformDataGetRenderDataService.getScaledLocalToWorldMatrixTypeArray,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };