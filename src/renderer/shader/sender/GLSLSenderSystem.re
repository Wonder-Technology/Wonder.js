open StateDataType;

open GlType;

open Gl;

open GLSLSenderStateUtils;

open Js.Typed_array;

let getGLSLSenderData = getGLSLSenderData;

/* TODO optimize? */
let disableVertexAttribArray = (gl, state: StateDataType.state) => {
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
                let {vertexAttribHistoryArray} = getGLSLSenderData(state);
                vertexAttribHistoryArray
                |> Js.Array.filter(WonderCommonlib.JudgeUtils.isBool)
                |> Js.Array.length == Js.Array.length(vertexAttribHistoryArray)
              }
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let {vertexAttribHistoryArray} as record = getGLSLSenderData(state);
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

let deepCopyForRestore = GLSLSenderStateUtils.deepCopyForRestore;

let restore = GLSLSenderStateUtils.restore;

let sendFloat = GLSLSenderSendDataUtils.sendFloat;

let sendFloat3 = GLSLSenderSendDataUtils.sendFloat3;

let sendVec3 = GLSLSenderSendDataUtils.sendVec3;