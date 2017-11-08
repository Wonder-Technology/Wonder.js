open StateDataType;

open GlType;

open CacheType;

open Gl;

open GlslSenderStateUtils;

let getBufferSizeByType = (type_: string) =>
  switch type_ {
  | "vec2" => 2
  | "vec3" => 3
  | _ => ExceptionHandlerSystem.throwMessage({j|invalide type_:$type_|j})
  };

/* todo optimize: send uniform judge cache data */
let sendBuffer = (gl, size: int, pos: int, buffer: buffer, state: StateDataType.state) => {
  let {vertexAttribHistoryArray} = getGLSLSenderData(state);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
  ArraySystem.isNotEqual(pos, true, vertexAttribHistoryArray) ?
    {
      enableVertexAttribArray(pos, gl);
      Array.unsafe_set(vertexAttribHistoryArray, pos, true);
      state
    } :
    state
};

let getModelMMatrixData = (uid: string, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrix(
    Js.Option.getExn(GameObjectSystem.getTransformComponent(uid, state)),
    state
  );

let sendMatrix4 = (gl, pos: int, data: cache(Js.Array.t(float))) =>
  switch data {
  | Cache(data) => ()
  | New(data) => uniformMatrix4fv(pos, Js.false_, data, gl)
  };