let getSendNoCachableDataByType = (type_) =>
  GLSLSenderSendDataUtils.(
    switch type_ {
    | "mat4" => sendMatrix4 |> Obj.magic
    | "mat3" => sendMatrix3 |> Obj.magic
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="getSendNoCachableDataByType",
          ~description={j|unknown type:$type_|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      )
    }
  );

let getSendCachableDataByType = (type_) =>
  GLSLSenderSendDataUtils.(
    switch type_ {
    | "vec3" => sendVec3 |> Obj.magic
    | "float3" => sendFloat3 |> Obj.magic
    | "float" => sendFloat |> Obj.magic
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="getSendCachableDataByType",
          ~description={j|unknown type:$type_|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      )
    }
  );