open StateDataType;

open Contract;

open GlType;

open Gl;

open GlslSenderStateUtils;

open Js.Typed_array;

/* todo optimize? */
let disableVertexAttribArray = (gl, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "vertexAttribHistory:array('a) should has no hole",
          () => {
            let {vertexAttribHistoryArray} = getGLSLSenderData(state);
            vertexAttribHistoryArray
            |> Js.Array.filter(JudgeUtils.isBool)
            |> Js.Array.length == Js.Array.length(vertexAttribHistoryArray)
          }
        )
      )
  );
  let {vertexAttribHistoryArray} as data = getGLSLSenderData(state);
  vertexAttribHistoryArray
  |> Js.Array.forEachi(
       (isEnable: bool, pos: int) =>
         isEnable ?
           disableVertexAttribArray(pos, gl) :
           /* if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) { */
           ExceptionHandlerSystem.throwMessage("should always be true")
     );
  data.vertexAttribHistoryArray = ArraySystem.createEmpty();
  state
};

let initData = () => {
  attributeSendDataMap: HashMapSystem.createEmpty(),
  uniformSendDataMap: HashMapSystem.createEmpty(),
  drawPointsFuncMap: HashMapSystem.createEmpty(),
  vertexAttribHistoryArray: ArraySystem.createEmpty(),
  /* lastSendArrayBuffer: None, */
  lastSendElementArrayBuffer: None
};