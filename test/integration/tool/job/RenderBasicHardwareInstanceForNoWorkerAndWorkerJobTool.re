open Sinon;

let prepareForBufferSubDataCase = (sandbox, prepareFunc, state) => {
  let (state, gameObject, sourceInstance, objectInstanceGameObject) = prepareFunc(sandbox, state^);
  let sourceTransform = state |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
  let objectTransform =
    state |> GameObjectAPI.unsafeGetGameObjectTransformComponent(objectInstanceGameObject);
  let pos1 = (1., 2., 3.);
  let pos2 = (2., 4., 5.);
  let state =
    state
    |> TransformAPI.setTransformLocalPosition(sourceTransform, pos1)
    |> TransformAPI.setTransformLocalPosition(objectInstanceGameObject, pos2);
  let array_buffer = 1;
  let bufferSubData = createEmptyStubWithJsObjSandbox(sandbox);
  (state, (sourceTransform, objectTransform), array_buffer, bufferSubData)
};

let testForBufferSubDataCase =
    (sandbox, (sourceTransform, objectTransform), array_buffer, bufferSubDataFunc, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  let data = Js.Typed_array.Float32Array.fromLength(64 * 16);
  let transformArr = [|sourceTransform, objectTransform|];
  ArrayService.range(0, 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (offset, index) => {
           let transform = transformArr[index];
           TypeArrayService.fillFloat32ArrayWithOffset(
             data,
             TransformTool.getLocalToWorldMatrixTypeArray(transform, state),
             offset
           );
           offset + 16
         }
       ),
       0
     )
  |> ignore;
  ArrayService.range(2, 63)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (offset, index) => {
           TypeArrayService.fillFloat32ArrayWithOffset(
             data,
             Js.Typed_array.Float32Array.make([|
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.,
               0.
             |]),
             offset
           );
           offset + 16
         }
       ),
       32
     )
  |> ignore;
  bufferSubDataFunc |> withThreeArgs(array_buffer, 0, data) |> expect |> toCalledOnce
};

let prepareGetAttribLocationForHandleInstanceData = (sandbox, state) => {
  let pos1 = 1;
  let pos2 = 2;
  let pos3 = 3;
  let pos4 = 4;
  let getAttribLocation = GLSLLocationTool.getAttribLocation(~pos=pos1, sandbox, "a_mVec4_0");
  getAttribLocation |> withTwoArgs(Sinon.matchAny, "a_mVec4_1") |> returns(pos2) |> ignore;
  getAttribLocation |> withTwoArgs(Sinon.matchAny, "a_mVec4_2") |> returns(pos3) |> ignore;
  getAttribLocation |> withTwoArgs(Sinon.matchAny, "a_mVec4_3") |> returns(pos4) |> ignore;
  (state, pos1, pos2, pos3, pos4, getAttribLocation)
};