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
  let data = Js.Typed_array.Float32Array.fromLength(64 * (16 + 9));
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
           TypeArrayService.fillFloat32ArrayWithOffset(
             data,
             TransformTool.updateAndGetNormalMatrixTypeArray(transform, state),
             offset + 16
           );
           offset + 16 + 9
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
           TypeArrayService.fillFloat32ArrayWithOffset(
             data,
             Js.Typed_array.Float32Array.make([|0., 0., 0., 0., 0., 0., 0., 0., 0.|]),
             offset + 16
           );
           offset + 16 + 9
         }
       ),
       25 * 2
     )
  |> ignore;
  bufferSubDataFunc |> withThreeArgs(array_buffer, 0, data) |> expect |> toCalledOnce
};