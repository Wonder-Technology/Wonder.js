open Gl;

let disableVertexAttribArray = (gl, vertexAttribHistoryArray) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|vertexAttribHistory:array('a) has no hole|j},
                ~actual={j|not|j}
              ),
              () =>
                vertexAttribHistoryArray
                |> Js.Array.filter(WonderCommonlib.JudgeService.isBool)
                |> Js.Array.length == Js.Array.length(vertexAttribHistoryArray)
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  vertexAttribHistoryArray
  |> Js.Array.forEachi(
       (isEnable: bool, pos: int) =>
         isEnable ?
           disableVertexAttribArray(pos, gl) :
           /* if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) { */
           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="disableVertexAttribArray",
               ~description={j|should always be true|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j}
             )
           )
     );
  WonderCommonlib.ArrayService.createEmpty()
};