let getHandle = (recordTuple, name) =>
  switch name {
  | "defineLightCount" => DefineLightCountInitLightMaterialService.execHandle(recordTuple)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getHandle",
        ~description={j|unknown handle name: $name|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };