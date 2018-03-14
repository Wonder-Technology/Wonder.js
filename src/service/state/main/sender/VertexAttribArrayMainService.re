open MainStateDataType;

open Gl;

let disableVertexAttribArray = (gl, state: MainStateDataType.state) => {
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
              () => {
                let {vertexAttribHistoryArray} = state.glslSenderRecord;
                vertexAttribHistoryArray
                |> Js.Array.filter(WonderCommonlib.JudgeUtils.isBool)
                |> Js.Array.length == Js.Array.length(vertexAttribHistoryArray)
              }
            )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  let {vertexAttribHistoryArray} as record = state.glslSenderRecord;
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
  record.vertexAttribHistoryArray = WonderCommonlib.ArraySystem.createEmpty();
  state
};