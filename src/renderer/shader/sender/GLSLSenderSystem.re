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
    StateData.stateData.isTest
  );
  let {vertexAttribHistoryArray} as data = getGLSLSenderData(state);
  vertexAttribHistoryArray
  |> Js.Array.forEachi(
       (isEnable: bool, pos: int) =>
         isEnable ?
           disableVertexAttribArray(pos, gl) :
           /* if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) { */
           ExceptionHandleSystem.throwMessage("should always be true")
     );
  data.vertexAttribHistoryArray = WonderCommonlib.ArraySystem.createEmpty();
  state
};

let deepCopyStateForRestore = GLSLSenderStateUtils.deepCopyStateForRestore;

let restore = GLSLSenderStateUtils.restore;